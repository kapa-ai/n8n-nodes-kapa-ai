import type { INodeProperties } from 'n8n-workflow';
import { cursorPagination, limitField, projectIdField, returnAllField } from './descriptions';

/** Coverage gaps and top questions expose an identical pair of period endpoints. */
export function periodsGetManyDescription(resource: string): INodeProperties[] {
	const show = { operation: ['getPeriods'], resource: [resource] };

	return [
		projectIdField({ show }),
		returnAllField({ show }, { pagination: cursorPagination }),
		limitField({ show: { ...show, returnAll: [false] } }, { sendPageSize: true, maxValue: 500 }),
		{
			displayName: 'Options',
			name: 'options',
			type: 'collection',
			placeholder: 'Add option',
			default: {},
			displayOptions: { show },
			options: [
				{
					displayName: 'Interval',
					name: 'interval',
					type: 'options',
					default: 'weekly',
					description: 'Only return periods that cover this interval',
					options: [
						{
							name: 'Monthly',
							value: 'monthly',
						},
						{
							name: 'Quarterly',
							value: 'quarterly',
						},
						{
							name: 'Weekly',
							value: 'weekly',
						},
					],
					routing: {
						send: {
							type: 'query',
							property: 'interval',
						},
					},
				},
			],
		},
	];
}

/** Clusters are always fetched for a single period returned by the periods endpoint. */
export function clustersGetManyDescription(resource: string): INodeProperties[] {
	const show = { operation: ['getClusters'], resource: [resource] };

	return [
		{
			displayName: 'Period ID',
			name: 'periodId',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'e.g. 4b1c2e6a-1f8d-4a3b-9c7e-2d5f8a0b3c1d',
			description: 'The period to return clusters for, as returned by the periods operation',
			displayOptions: { show },
		},
		returnAllField({ show }, { pagination: cursorPagination }),
		limitField({ show: { ...show, returnAll: [false] } }, { sendPageSize: true, maxValue: 500 }),
	];
}
