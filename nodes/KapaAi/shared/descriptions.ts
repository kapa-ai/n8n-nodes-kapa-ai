import type {
	IDataObject,
	IDisplayOptions,
	IN8nRequestOperations,
	INodeProperties,
} from 'n8n-workflow';

/** Kapa wants UUID lists as arrays; the fields collect a comma separated string. */
export const commaSeparatedToArray =
	'={{ $value.split(",").map((entry) => entry.trim()).filter((entry) => entry !== "") }}';

/** Kapa rejects timestamps with no timezone offset, which n8n's date picker can produce. */
export const dateTimeToIsoUtc = '={{ $value ? new Date($value).toISOString() : undefined }}';

/**
 * These overrides are shallow-merged over the request options and also run on the first
 * request, where `$response` is `{}`. So `qs` and `body` are rebuilt from `$request` rather
 * than replaced, which would drop the user's filters, and the cursor falls back to '' because
 * Kapa rejects `cursor=undefined`. Following `next` needs none of that — it carries every
 * parameter already.
 */
export const cursorPagination: IN8nRequestOperations = {
	pagination: {
		type: 'generic',
		properties: {
			continue: '={{ !!$response?.body?.next_cursor }}',
			request: {
				qs: '={{ ({ ...$request.qs, cursor: $response?.body?.next_cursor ?? "" }) }}' as unknown as IDataObject,
			},
		},
	},
};

export const pagePagination: IN8nRequestOperations = {
	pagination: {
		type: 'generic',
		properties: {
			continue: '={{ !!$response?.body?.next }}',
			request: {
				url: '={{ $response?.body?.next ?? $request.url }}',
			},
		},
	},
};

export const bodyPagePagination: IN8nRequestOperations = {
	pagination: {
		type: 'generic',
		properties: {
			continue:
				'={{ !!$response?.body && $response.body.page * $response.body.page_size < $response.body.total_items }}',
			request: {
				body: '={{ ({ ...$request.body, page: ($response?.body?.page ?? 0) + 1 }) }}' as unknown as IDataObject,
			},
		},
	},
};

/** Most endpoints are scoped to a project, which Kapa takes as a path parameter. */
export function projectIdField(displayOptions: IDisplayOptions): INodeProperties {
	return {
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 4b1c2e6a-1f8d-4a3b-9c7e-2d5f8a0b3c1d',
		description: 'The project to operate on, found in your Kapa dashboard URL',
		displayOptions,
	};
}

export function returnAllField(
	displayOptions: IDisplayOptions,
	options: {
		/** Omit for endpoints that return their whole collection in one response. */
		pagination?: IN8nRequestOperations;
		/** Page even when the toggle is off, where one page cannot satisfy a larger limit. */
		alwaysPaginate?: boolean;
	} = {},
): INodeProperties {
	const { pagination, alwaysPaginate = false } = options;

	return {
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions,
		...(pagination && {
			routing: {
				send: { paginate: alwaysPaginate ? true : '={{ $value }}' },
				operations: pagination,
			},
		}),
	};
}

export function limitField(
	displayOptions: IDisplayOptions,
	options: {
		/** Send the limit as `page_size`, for endpoints that honour one. */
		sendPageSize?: boolean;
		/** Upper bound the endpoint enforces on the page size. */
		maxValue?: number;
	} = {},
): INodeProperties {
	const { sendPageSize = false, maxValue } = options;

	return {
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			...(maxValue !== undefined && { maxValue }),
		},
		description: 'Max number of results to return',
		displayOptions,
		routing: {
			...(sendPageSize && { send: { type: 'query', property: 'page_size' } }),
			output: { maxResults: '={{ $value }}' },
		},
	};
}
