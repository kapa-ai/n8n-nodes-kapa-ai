import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	dateTimeToIsoUtc,
	limitField,
	projectIdField,
	returnAllField,
} from '../../shared/descriptions';

const showOnlyForThreadGetMany = {
	operation: ['getAll'],
	resource: ['thread'],
};

export const threadGetManyDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForThreadGetMany }),
	returnAllField({ show: showOnlyForThreadGetMany }, { pagination: cursorPagination }),
	limitField(
		{ show: { ...showOnlyForThreadGetMany, returnAll: [false] } },
		{ sendPageSize: true, maxValue: 500 },
	),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add filter',
		default: {},
		displayOptions: {
			show: showOnlyForThreadGetMany,
		},
		options: [
			{
				displayName: 'Custom Tag IDs',
				name: 'customTags',
				type: 'string',
				default: '',
				description: 'Comma-separated custom tag IDs to filter by',
				routing: {
					send: {
						type: 'query',
						property: 'custom_tags',
					},
				},
			},
			{
				displayName: 'Integration ID',
				name: 'integration',
				type: 'string',
				default: '',
				description: 'Only return threads belonging to this integration',
				routing: {
					send: {
						type: 'query',
						property: 'integration',
					},
				},
			},
			{
				displayName: 'Status Tag ID',
				name: 'statusTag',
				type: 'string',
				default: '',
				placeholder: 'e.g. null',
				description: 'Only return threads with this status tag, or "null" for untagged threads',
				routing: {
					send: {
						type: 'query',
						property: 'status_tag',
					},
				},
			},
			{
				displayName: 'Updated Since',
				name: 'updatedSince',
				type: 'dateTime',
				default: '',
				description: 'Only return threads with activity at or after this moment',
				routing: {
					send: {
						type: 'query',
						property: 'updated_since',
						value: dateTimeToIsoUtc,
					},
				},
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForThreadGetMany,
		},
		options: [
			{
				displayName: 'Include',
				name: 'include',
				type: 'multiOptions',
				default: [],
				description: 'Nested data to return alongside each thread',
				options: [
					{
						name: 'Custom Tags',
						value: 'custom_tags',
					},
					{
						name: 'End User',
						value: 'end_user',
					},
					{
						name: 'Feedback',
						value: 'feedback',
					},
					{
						name: 'Integration',
						value: 'integration',
					},
					{
						name: 'Interaction Tags',
						value: 'interaction_tags',
					},
					{
						name: 'Status Tag',
						value: 'status_tag',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'include',
						value: '={{ $value.join(",") }}',
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				default: 'desc',
				description: 'Sort direction for the last activity of each thread',
				options: [
					{
						name: 'Newest First',
						value: 'desc',
					},
					{
						name: 'Oldest First',
						value: 'asc',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'sort',
					},
				},
			},
		],
	},
];
