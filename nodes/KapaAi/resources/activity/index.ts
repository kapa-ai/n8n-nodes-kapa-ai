import type { INodeProperties } from 'n8n-workflow';
import { activityGetDescription } from './get';

const showOnlyForActivity = {
	resource: ['activity'],
};

export const activityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForActivity,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get activity statistics',
				description:
					'Get aggregate query counts, feedback, unique users and ticket deflections for a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/activity/',
					},
				},
			},
		],
		default: 'get',
	},
	...activityGetDescription,
];
