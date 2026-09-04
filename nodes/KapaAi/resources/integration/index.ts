import type { INodeProperties } from 'n8n-workflow';
import { integrationGetManyDescription } from './getAll';

const showOnlyForIntegrations = {
	resource: ['integration'],
};

export const integrationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForIntegrations,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many integrations',
				description: 'Get the integrations configured for a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/integrations/',
					},
				},
			},
		],
		default: 'getAll',
	},
	...integrationGetManyDescription,
];
