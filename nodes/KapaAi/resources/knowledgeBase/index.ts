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
			'Fetch full documents by their exact source URL or document ID, with their content in Markdown. The results are paginated, long documents are truncated, and the results may be empty when nothing matches exactly. Use it to look up specific documents rather than to search.',
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
			'Return the chunks most relevant to the query, in descending order of relevance, and a fixed number of them in the default mode. Each chunk is a short, self-contained snippet of text from a single page or item, with its source URL and Markdown content. When the knowledge sources hold nothing relevant to the query, the chunks may be unrelated.',
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
