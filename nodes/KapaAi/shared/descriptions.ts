import type {
	IDataObject,
	IDisplayOptions,
	IN8nRequestOperations,
	INodeProperties,
} from 'n8n-workflow';

/** Kapa rejects blank strings, so a field left empty is left out of the request. */
export const omitIfBlank = '={{ $value || undefined }}';

/** Kapa wants lists as non-empty arrays; the fields collect a comma separated string. */
export const commaSeparatedToArray =
	'={{ (() => { const entries = $value.split(",").map((entry) => entry.trim()).filter((entry) => entry !== ""); return entries.length ? entries : undefined; })() }}';

/**
 * Kapa pages over the distinct requested URLs and document IDs, omits misses and counts only
 * found documents in `total_items`, so the requested list, not `total_items`, decides when paging
 * is done. IDs are UUIDs, which Kapa compares case-insensitively.
 */
const distinctRequestedUrls = '($request.body.urls ?? []).unique().length';
const distinctRequestedIds =
	'($request.body.document_ids ?? []).map((id) => id.toLowerCase()).unique().length';
const pagedSoFar = '$response.body.page * $response.body.page_size';

export const documentsPagination: IN8nRequestOperations = {
	pagination: {
		type: 'generic',
		properties: {
			continue: `={{ !!$response?.body && ${pagedSoFar} < ${distinctRequestedUrls} + ${distinctRequestedIds} }}`,
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
		description: 'The project to query. Copy its ID from Settings > Projects in the Kapa platform.',
		displayOptions,
	};
}

/** Pages even when the toggle is off, because one page cannot satisfy a larger limit. */
export function returnAllField(
	displayOptions: IDisplayOptions,
	pagination: IN8nRequestOperations,
): INodeProperties {
	return {
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions,
		routing: {
			send: { paginate: true },
			operations: pagination,
		},
	};
}

export function limitField(displayOptions: IDisplayOptions): INodeProperties {
	return {
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		displayOptions,
		routing: {
			output: { maxResults: '={{ $value }}' },
		},
	};
}
