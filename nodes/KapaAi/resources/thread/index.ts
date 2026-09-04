import type { INodeProperties } from 'n8n-workflow';
import { threadGetDescription } from './get';
import { threadGetManyDescription } from './getAll';

const showOnlyForThreads = {
	resource: ['thread'],
};

export const threadDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForThreads,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a thread',
				description: 'Get the data of a single thread',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/threads/{{ $parameter.threadId }}/',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many threads',
				description: 'Get the threads of a project, each with its question answer pairs',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/threads/',
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
	...threadGetDescription,
	...threadGetManyDescription,
];
