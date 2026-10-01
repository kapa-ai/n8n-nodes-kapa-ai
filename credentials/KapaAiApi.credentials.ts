import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * No Kapa endpoint is unscoped, but auth is checked before the lookup: reading a project that
 * cannot exist returns 404 for a good key and 401/403 for a bad one. The test relies on that.
 */
const NON_EXISTENT_PROJECT_ID = '00000000-0000-0000-0000-000000000000';

export class KapaAiApi implements ICredentialType {
	name = 'kapaAiApi';

	displayName = 'Kapa AI API';

	icon: Icon = {
		light: 'file:../nodes/KapaAi/kapaAi.svg',
		dark: 'file:../nodes/KapaAi/kapaAi.dark.svg',
	};

	documentationUrl =
		'https://docs.kapa.ai/retrieval/guides/set-up-n8n-node#create-a-kapa-ai-api-credential';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.kapa.ai',
			url: `/org/v1/projects/${NON_EXISTENT_PROJECT_ID}/`,
			// Let the expected 404 pass; keep failing on bad keys and on Kapa being unavailable.
			ignoreHttpStatusErrors: { ignore: true, except: [401, 403, 429, 500, 502, 503, 504] },
		},
	};
}
