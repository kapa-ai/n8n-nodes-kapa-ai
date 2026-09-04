import type { INodeProperties } from 'n8n-workflow';
import { feedbackUpsertDescription } from './upsert';

const showOnlyForFeedback = {
	resource: ['feedback'],
};

export const feedbackDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFeedback,
		},
		options: [
			{
				name: 'Create or Update',
				value: 'upsert',
				action: 'Create or update feedback',
				description: 'Create a new record, or update the current one if it already exists (upsert)',
				routing: {
					request: {
						method: 'POST',
						url: '/query/v1/feedback/upsert/',
					},
				},
			},
		],
		default: 'upsert',
	},
	...feedbackUpsertDescription,
];
