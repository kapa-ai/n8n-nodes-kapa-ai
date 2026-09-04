import type { INodeProperties } from 'n8n-workflow';
import { dateTimeToIsoUtc, projectIdField } from '../../shared/descriptions';

const showOnlyForActivityGet = {
	operation: ['get'],
	resource: ['activity'],
};

export const activityGetDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForActivityGet }),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		displayOptions: {
			show: showOnlyForActivityGet,
		},
		default: {},
		options: [
			{
				displayName: 'End Date',
				name: 'endDateTime',
				type: 'dateTime',
				default: '',
				description: 'Only include activity recorded at or before this moment',
				routing: {
					send: {
						type: 'query',
						property: 'end_date_time',
						value: dateTimeToIsoUtc,
					},
				},
			},
			{
				displayName: 'Integration IDs',
				name: 'integrationFilter',
				type: 'string',
				default: '',
				placeholder: 'e.g. 4b1c2e6a-1f8d-4a3b-9c7e-2d5f8a0b3c1d',
				description:
					'Comma-separated list of integration IDs to restrict the statistics to. Leave empty to include every integration.',
				routing: {
					send: {
						type: 'query',
						property: 'integration_filter',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDateTime',
				type: 'dateTime',
				default: '',
				description: 'Only include activity recorded at or after this moment',
				routing: {
					send: {
						type: 'query',
						property: 'start_date_time',
						value: dateTimeToIsoUtc,
					},
				},
			},
		],
	},
];
