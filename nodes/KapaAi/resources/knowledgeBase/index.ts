import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { knowledgeBaseGetDocumentsDescription } from './getDocuments';
import { knowledgeBaseSearchDescription } from './search';

const showOnlyForKnowledgeBase = {
	resource: ['knowledgeBase'],
};

const operations: INodePropertyOptions[] = [
	{
		name: 'Get Many Documents',
		value: 'getDocuments',
		action: 'Get many documents',
		description:
			'Fetch whole documents by their exact source URL or document ID, as Markdown. Entries that match nothing are left out. Use it to look up known documents rather than to search.',
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
		name: 'Search',
		value: 'search',
		action: 'Search the knowledge base',
		description:
			'Find relevant information in your knowledge sources. Each search result includes the relevant text in Markdown and a link to the original source, best match first. When your sources hold nothing relevant, the results may be unrelated.',
		routing: {
			request: {
				method: 'POST',
				url: '=/query/v1/projects/{{ $parameter.projectId }}/retrieval/',
			},
		},
	},
];

const operationNames = Object.fromEntries(operations.map(({ value, name }) => [value, name]));

export const knowledgeBaseSubtitle = `={{ (${JSON.stringify(operationNames)})[$parameter.operation] }}`;

export const knowledgeBaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForKnowledgeBase,
		},
		options: operations,
		default: 'search',
	},
	...knowledgeBaseGetDocumentsDescription,
	...knowledgeBaseSearchDescription,
];
