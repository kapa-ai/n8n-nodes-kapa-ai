import type { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import { commaSeparatedToArray } from '../../shared/descriptions';

export function chatQueryField(displayOptions: IDisplayOptions): INodeProperties {
	return {
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 3,
		},
		placeholder: 'e.g. How do I authenticate against the API?',
		description: 'The question to ask Kapa',
		routing: {
			send: {
				type: 'body',
				property: 'query',
			},
		},
		displayOptions,
	};
}

/** Both chat endpoints take the same optional payload. */
export function chatAdditionalFields(displayOptions: IDisplayOptions): INodeProperties {
	return {
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add field',
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'Customization ID',
				name: 'customizationId',
				type: 'string',
				default: '',
				description: 'Customization to apply to this request',
				routing: {
					send: {
						type: 'body',
						property: 'customization_id',
					},
				},
			},
			{
				displayName: 'Integration ID',
				name: 'integrationId',
				type: 'string',
				default: '',
				description:
					'The integration the user is interacting with. Kapa falls back to the default integration when omitted.',
				routing: {
					send: {
						type: 'body',
						property: 'integration_id',
					},
				},
			},
			{
				displayName: 'Origin URL',
				name: 'originUrl',
				type: 'string',
				default: '',
				placeholder: 'e.g. https://docs.example.com/getting-started',
				description: 'The page the query was submitted from, recorded against the answer',
				routing: {
					send: {
						type: 'body',
						property: 'metadata.origin_url',
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
				displayName: 'Source IDs',
				name: 'sourceIdsInclude',
				type: 'string',
				default: '',
				description: 'Comma-separated source IDs to restrict retrieval to',
				routing: {
					send: {
						type: 'body',
						property: 'source_ids_include',
						value: commaSeparatedToArray,
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
	};
}
