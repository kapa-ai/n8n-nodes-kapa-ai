import type { INodeProperties } from 'n8n-workflow';
import { clustersGetManyDescription, periodsGetManyDescription } from '../../shared/periods';

const showOnlyForCoverageGaps = {
	resource: ['coverageGap'],
};

export const coverageGapDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCoverageGaps,
		},
		options: [
			{
				name: 'Get Many Clusters',
				value: 'getClusters',
				action: 'Get many coverage gap clusters',
				description:
					'Get the clusters of uncertain questions in a period, each with a suggestion and its most recent threads',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/coverage-gaps/periods/{{ $parameter.periodId }}/',
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
				action: 'Get many coverage gap periods',
				description: 'Get the completed coverage gap periods for a project, newest first',
				routing: {
					request: {
						method: 'GET',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/coverage-gaps/periods/',
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
	...clustersGetManyDescription('coverageGap'),
	...periodsGetManyDescription('coverageGap'),
];
