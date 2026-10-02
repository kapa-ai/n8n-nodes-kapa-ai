import type { INodeProperties } from 'n8n-workflow';
import { commaSeparatedToArray, omitIfBlank, projectIdField } from '../../shared/descriptions';

const showOnlyForSearch = {
	operation: ['search'],
	resource: ['knowledgeBase'],
};

export const knowledgeBaseSearchDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForSearch }),
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 3,
		},
		placeholder: 'e.g. How do I authenticate against the API?',
		description: 'A single question or request, written as a complete sentence',
		displayOptions: {
			show: showOnlyForSearch,
		},
		routing: {
			send: {
				type: 'body',
				property: 'query',
			},
		},
	},
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		default: 'default',
		description:
			'Default is faster and returns a fixed number of search results. Deep takes longer, reads further into your sources, and returns only what it finds relevant, usually fewer results.',
		displayOptions: {
			show: showOnlyForSearch,
		},
		options: [
			{
				name: 'Default',
				value: 'default',
			},
			{
				name: 'Deep',
				value: 'deep',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'mode',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForSearch,
		},
		options: [
			{
				displayName: 'End User',
				name: 'endUser',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add end user',
				description:
					'Who is asking, recorded in Kapa analytics when Email or Unique Client ID is set. Does not affect the results.',
				options: [
					{
						displayName: 'End User',
						name: 'values',
						values: [
							{
								displayName: 'Company Name',
								name: 'companyName',
								type: 'string',
								default: '',
								description: 'Company the asking user belongs to',
								routing: {
									send: {
										type: 'body',
										property: 'user.metadata.company_name',
										value: omitIfBlank,
									},
								},
							},
							{
								displayName: 'Email',
								name: 'email',
								type: 'string',
								placeholder: 'name@email.com',
								default: '',
								description: 'Email address of the asking user',
								routing: {
									send: {
										type: 'body',
										property: 'user.email',
										value: omitIfBlank,
									},
								},
							},
							{
								displayName: 'First Name',
								name: 'firstName',
								type: 'string',
								default: '',
								description: 'First name of the asking user',
								routing: {
									send: {
										type: 'body',
										property: 'user.metadata.first_name',
										value: omitIfBlank,
									},
								},
							},
							{
								displayName: 'Last Name',
								name: 'lastName',
								type: 'string',
								default: '',
								description: 'Last name of the asking user',
								routing: {
									send: {
										type: 'body',
										property: 'user.metadata.last_name',
										value: omitIfBlank,
									},
								},
							},
							{
								displayName: 'Unique Client ID',
								name: 'uniqueClientId',
								type: 'string',
								default: '',
								description:
									'An ID that stays the same for this user across queries, for example your own user ID',
								routing: {
									send: {
										type: 'body',
										property: 'user.unique_client_id',
										value: omitIfBlank,
									},
								},
							},
						],
					},
				],
			},
			{
				displayName: 'Integration ID',
				name: 'integrationId',
				type: 'string',
				default: '',
				description:
					'Integration to attribute the query to in Kapa analytics. Does not affect the results.',
				routing: {
					send: {
						type: 'body',
						property: 'integration_id',
						value: omitIfBlank,
					},
				},
			},
			{
				displayName: 'Max Characters',
				name: 'maxChars',
				type: 'number',
				default: 35000,
				typeOptions: {
					minValue: 1,
					maxValue: 60000,
				},
				description:
					'Maximum total length of the search results in characters. Results are added best match first until the next one would go over the limit. No result is cut short.',
				routing: {
					send: {
						type: 'body',
						property: 'max_chars',
					},
				},
			},
			{
				displayName: 'Redact Query',
				name: 'redactQuery',
				type: 'boolean',
				default: false,
				description: 'Whether to redact the query in Kapa analytics. Does not affect the results.',
				routing: {
					send: {
						type: 'body',
						property: 'redact_query',
					},
				},
			},
			{
				displayName: 'Source Group IDs',
				name: 'sourceGroupIdsInclude',
				type: 'string',
				default: '',
				description: 'Comma-separated source group IDs to restrict the search to',
				routing: {
					send: {
						type: 'body',
						property: 'source_group_ids_include',
						value: commaSeparatedToArray,
					},
				},
			},
			{
				displayName: 'Top K',
				name: 'topK',
				type: 'number',
				default: 15,
				typeOptions: {
					minValue: 1,
					maxValue: 15,
				},
				description: 'Maximum number of search results to return. Deep mode usually returns fewer.',
				routing: {
					send: {
						type: 'body',
						property: 'top_k',
					},
				},
			},
		],
	},
];
