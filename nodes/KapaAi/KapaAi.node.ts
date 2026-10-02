import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { knowledgeBaseDescription } from './resources/knowledgeBase';

export class KapaAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kapa AI',
		name: 'kapaAi',
		icon: { light: 'file:kapaAi.svg', dark: 'file:kapaAi.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle:
			'={{ ({ getDocuments: "Get Many Documents", search: "Search" })[$parameter.operation] }}',
		description: 'Search your Kapa knowledge base from AI agents and workflows',
		defaults: {
			name: 'Kapa AI',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'kapaAiApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.kapa.ai',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Knowledge Base',
						value: 'knowledgeBase',
					},
				],
				default: 'knowledgeBase',
			},
			...knowledgeBaseDescription,
		],
	};
}
