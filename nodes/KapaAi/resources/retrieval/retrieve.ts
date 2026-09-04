import type { INodeProperties } from 'n8n-workflow';
import { commaSeparatedToArray, projectIdField } from '../../shared/descriptions';

const showOnlyForRetrieve = {
	operation: ['retrieve'],
	resource: ['retrieval'],
};

export const retrievalRetrieveDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForRetrieve }),
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
		description: 'The query to run semantic retrieval for',
		displayOptions: {
			show: showOnlyForRetrieve,
		},
		routing: {
			send: {
				type: 'body',
				property: 'query',
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
			show: showOnlyForRetrieve,
		},
		options: [
			{
				displayName: 'Integration ID',
				name: 'integrationId',
				type: 'string',
				default: '',
				description: 'The integration to attribute this retrieval to',
				routing: {
					send: {
						type: 'body',
						property: 'integration_id',
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
					'Maximum number of characters across all returned chunks. Chunks are included in order of relevance until the budget is used up.',
				routing: {
					send: {
						type: 'body',
						property: 'max_chars',
					},
				},
			},
			{
				displayName: 'MCP Client Name',
				name: 'mcpClientName',
				type: 'string',
				default: '',
				placeholder: 'e.g. Claude Code',
				description: 'Name of the calling MCP client, used to break agent analytics down by client',
				routing: {
					send: {
						type: 'body',
						property: 'mcp_client_meta.name',
					},
				},
			},
			{
				displayName: 'MCP Client Version',
				name: 'mcpClientVersion',
				type: 'string',
				default: '',
				description: 'Version of the calling MCP client',
				routing: {
					send: {
						type: 'body',
						property: 'mcp_client_meta.version',
					},
				},
			},
			{
				displayName: 'Redact Query',
				name: 'redactQuery',
				type: 'boolean',
				default: false,
				description: 'Whether to redact the query in analytics',
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
				description: 'Comma-separated source group IDs to restrict retrieval to',
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
				description:
					'Maximum number of chunks to return. Fewer may come back if the character budget or pruning reduces the result.',
				routing: {
					send: {
						type: 'body',
						property: 'top_k',
					},
				},
			},
			{
				displayName: 'Use Pruning',
				name: 'usePruning',
				type: 'boolean',
				default: false,
				description:
					'Whether to prune low relevance chunks after retrieval, at the cost of added latency',
				routing: {
					send: {
						type: 'body',
						property: 'use_pruning',
					},
				},
			},
			{
				displayName: 'User Company Name',
				name: 'userCompanyName',
				type: 'string',
				default: '',
				description: 'Company the asking user belongs to',
				routing: {
					send: {
						type: 'body',
						property: 'user.metadata.company_name',
					},
				},
			},
			{
				displayName: 'User Email',
				name: 'userEmail',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the asking user',
				routing: {
					send: {
						type: 'body',
						property: 'user.email',
					},
				},
			},
			{
				displayName: 'User First Name',
				name: 'userFirstName',
				type: 'string',
				default: '',
				description: 'First name of the asking user',
				routing: {
					send: {
						type: 'body',
						property: 'user.metadata.first_name',
					},
				},
			},
			{
				displayName: 'User Last Name',
				name: 'userLastName',
				type: 'string',
				default: '',
				description: 'Last name of the asking user',
				routing: {
					send: {
						type: 'body',
						property: 'user.metadata.last_name',
					},
				},
			},
			{
				displayName: 'User Unique Client ID',
				name: 'userUniqueClientId',
				type: 'string',
				default: '',
				description:
					'Stable identifier for the asking user, for example a browser fingerprint or your own user ID',
				routing: {
					send: {
						type: 'body',
						property: 'user.unique_client_id',
					},
				},
			},
		],
	},
];
