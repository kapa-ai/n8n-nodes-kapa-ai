import type { INodeProperties } from 'n8n-workflow';
import { endUserGetManyDescription } from './getAll';

const showOnlyForEndUsers = {
	resource: ['endUser'],
};

export const endUserDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEndUsers,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many end users',
				description: 'Get the users who have interacted with your Kapa bot',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/end-users/',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'results',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
	...endUserGetManyDescription,
];
