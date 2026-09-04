import type { INodeProperties } from 'n8n-workflow';
import { projectGetDescription } from './get';

const showOnlyForProjects = {
	resource: ['project'],
};

export const projectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProjects,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a project',
				description: 'Get the data of a single project',
				routing: {
					request: {
						method: 'GET',
						url: '=/org/v1/projects/{{ $parameter.projectId }}/',
					},
				},
			},
		],
		default: 'get',
	},
	...projectGetDescription,
];
