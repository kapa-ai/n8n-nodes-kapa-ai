import type { INodeProperties } from 'n8n-workflow';
import { sourceGetManyDescription } from './getAll';
import { sourceGroupGetManyDescription } from './getAllSourceGroups';

const showOnlyForSources = {
	resource: ['source'],
};

export const sourceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSources,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many sources',
				description: 'Get the knowledge sources of a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/ingestion/v1/projects/{{ $parameter.projectId }}/sources/',
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
			{
				name: 'Get Many Source Groups',
				value: 'getAllSourceGroups',
				action: 'Get many source groups',
				description: 'Get the source groups of a project, including their nested source groups',
				routing: {
					request: {
						method: 'GET',
						url: '=/ingestion/v1/projects/{{ $parameter.projectId }}/source-groups/',
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
	...sourceGetManyDescription,
	...sourceGroupGetManyDescription,
];
