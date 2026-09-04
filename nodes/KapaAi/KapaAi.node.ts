import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { activityDescription } from './resources/activity';
import { chatDescription } from './resources/chat';
import { coverageGapDescription } from './resources/coverageGap';
import { endUserDescription } from './resources/endUser';
import { feedbackDescription } from './resources/feedback';
import { integrationDescription } from './resources/integration';
import { projectDescription } from './resources/project';
import { retrievalDescription } from './resources/retrieval';
import { sourceDescription } from './resources/source';
import { threadDescription } from './resources/thread';
import { topQuestionDescription } from './resources/topQuestion';

export class KapaAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kapa AI',
		name: 'kapaAi',
		icon: { light: 'file:kapaAi.svg', dark: 'file:kapaAi.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Kapa AI API',
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
						name: 'Activity',
						value: 'activity',
					},
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Coverage Gap',
						value: 'coverageGap',
					},
					{
						name: 'End User',
						value: 'endUser',
					},
					{
						name: 'Feedback',
						value: 'feedback',
					},
					{
						name: 'Integration',
						value: 'integration',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Retrieval',
						value: 'retrieval',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Thread',
						value: 'thread',
					},
					{
						name: 'Top Question',
						value: 'topQuestion',
					},
				],
				default: 'chat',
			},
			...activityDescription,
			...chatDescription,
			...coverageGapDescription,
			...endUserDescription,
			...feedbackDescription,
			...integrationDescription,
			...projectDescription,
			...retrievalDescription,
			...sourceDescription,
			...threadDescription,
			...topQuestionDescription,
		],
	};
}
