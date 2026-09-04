import type { INodeProperties } from 'n8n-workflow';
import { retrievalGetDocumentsDescription } from './getDocuments';
import { retrievalRetrieveDescription } from './retrieve';

const showOnlyForRetrieval = {
	resource: ['retrieval'],
};

export const retrievalDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRetrieval,
		},
		options: [
			{
				name: 'Get Many Documents',
				value: 'getDocuments',
				action: 'Get many documents',
				description:
					'Get the full markdown of ingested documents by their exact URL or document ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/documents/',
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
				name: 'Retrieve Chunks',
				value: 'retrieve',
				action: 'Retrieve chunks',
				description:
					'Get the most relevant chunks from your sources for a query, without generating an answer',
				routing: {
					request: {
						method: 'POST',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/retrieval/',
					},
				},
			},
		],
		default: 'retrieve',
	},
	...retrievalGetDocumentsDescription,
	...retrievalRetrieveDescription,
];
