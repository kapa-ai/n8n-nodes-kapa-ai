import type { INodeProperties } from 'n8n-workflow';
import {
	commaSeparatedToArray,
	documentsPagination,
	limitField,
	projectIdField,
	returnAllField,
} from '../../shared/descriptions';

const showOnlyForGetDocuments = {
	operation: ['getDocuments'],
	resource: ['knowledgeBase'],
};

export const knowledgeBaseGetDocumentsDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForGetDocuments }),
	{
		displayName: 'Fetch By',
		name: 'fetchBy',
		type: 'options',
		default: 'urls',
		description: 'Look documents up by URL, by document ID, or by both at once',
		displayOptions: {
			show: showOnlyForGetDocuments,
		},
		options: [
			{
				name: 'Document IDs',
				value: 'documentIds',
			},
			{
				name: 'Document IDs and URLs',
				value: 'both',
			},
			{
				name: 'URLs',
				value: 'urls',
			},
		],
	},
	{
		displayName: 'URLs',
		name: 'urls',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. https://docs.example.com/getting-started',
		description:
			'Comma-separated URLs to fetch. Each must exactly match a URL in your knowledge sources. Duplicates are ignored.',
		displayOptions: {
			show: {
				...showOnlyForGetDocuments,
				fetchBy: ['urls', 'both'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'urls',
				value: commaSeparatedToArray,
			},
		},
	},
	{
		displayName: 'Document IDs',
		name: 'documentIds',
		type: 'string',
		default: '',
		required: true,
		description: 'Comma-separated document IDs to fetch. Duplicates are ignored.',
		displayOptions: {
			show: {
				...showOnlyForGetDocuments,
				fetchBy: ['documentIds', 'both'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'document_ids',
				value: commaSeparatedToArray,
			},
		},
	},
	returnAllField({ show: showOnlyForGetDocuments }, documentsPagination),
	limitField({ show: { ...showOnlyForGetDocuments, returnAll: [false] } }),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForGetDocuments,
		},
		options: [
			{
				displayName: 'Max Characters per Document',
				name: 'maxCharsPerDocument',
				type: 'number',
				default: 50000,
				typeOptions: {
					minValue: 1,
					maxValue: 200000,
				},
				description:
					'Maximum length of each document in characters. Longer documents are cut at this limit and flagged.',
				routing: {
					send: {
						type: 'body',
						property: 'max_chars_per_document',
					},
				},
			},
			{
				displayName: 'Source Group IDs',
				name: 'sourceGroupIdsInclude',
				type: 'string',
				default: '',
				description: 'Comma-separated source group IDs to restrict the lookup to',
				routing: {
					send: {
						type: 'body',
						property: 'source_group_ids_include',
						value: commaSeparatedToArray,
					},
				},
			},
		],
	},
];
