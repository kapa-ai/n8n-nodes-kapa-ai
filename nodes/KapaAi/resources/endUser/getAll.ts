import type { INodeProperties } from 'n8n-workflow';
import {
	limitField,
	pagePagination,
	projectIdField,
	returnAllField,
} from '../../shared/descriptions';

const showOnlyForEndUserGetMany = {
	operation: ['getAll'],
	resource: ['endUser'],
};

export const endUserGetManyDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForEndUserGetMany }),
	returnAllField({ show: showOnlyForEndUserGetMany }, { pagination: pagePagination }),
	limitField(
		{ show: { ...showOnlyForEndUserGetMany, returnAll: [false] } },
		{ sendPageSize: true },
	),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add filter',
		default: {},
		displayOptions: {
			show: showOnlyForEndUserGetMany,
		},
		options: [
			{
				displayName: 'Has Email',
				name: 'hasEmail',
				type: 'boolean',
				default: true,
				description: 'Whether to only return end users that have an email address',
				routing: {
					send: {
						type: 'query',
						property: 'has_email',
					},
				},
			},
			{
				displayName: 'Order By',
				name: 'ordering',
				type: 'string',
				default: '',
				placeholder: 'e.g. -created_at',
				description: 'Field to order the results by. Prefix with a hyphen to sort descending.',
				routing: {
					send: {
						type: 'query',
						property: 'ordering',
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Only return end users matching this search term',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
		],
	},
];
