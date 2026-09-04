import type { INodeProperties } from 'n8n-workflow';
import { clustersGetManyDescription, periodsGetManyDescription } from '../../shared/periods';

const showOnlyForTopQuestions = {
	resource: ['topQuestion'],
};

export const topQuestionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTopQuestions,
		},
		options: [
			{
				name: 'Get Many Clusters',
				value: 'getClusters',
				action: 'Get many top question clusters',
				description:
					'Get the clusters of questions asked in a period, each with its most recent threads',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/top-questions/periods/{{ $parameter.periodId }}/',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'clusters',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many Periods',
				value: 'getPeriods',
				action: 'Get many top question periods',
				description: 'Get the completed top question periods for a project, newest first',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/top-questions/periods/',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'periods',
								},
							},
						],
					},
				},
			},
		],
		default: 'getPeriods',
	},
	...clustersGetManyDescription('topQuestion'),
	...periodsGetManyDescription('topQuestion'),
];
