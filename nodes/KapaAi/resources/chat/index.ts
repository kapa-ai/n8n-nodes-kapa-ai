import type { INodeProperties } from 'n8n-workflow';
import { chatSendMessageDescription } from './sendMessage';
import { chatSendMessageInThreadDescription } from './sendMessageInThread';

const showOnlyForChat = {
	resource: ['chat'],
};

export const chatDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForChat,
		},
		options: [
			{
				name: 'Send Message',
				value: 'sendMessage',
				action: 'Send a message',
				description: 'Ask a question, starting a new thread',
				routing: {
					request: {
						method: 'POST',
						url: '=/query/v1/projects/{{ $parameter.projectId }}/chat/',
					},
				},
			},
			{
				name: 'Send Message in Thread',
				value: 'sendMessageInThread',
				action: 'Send a message in a thread',
				description: 'Ask a follow-up question in an existing thread',
				routing: {
					request: {
						method: 'POST',
						url: '=/query/v1/threads/{{ $parameter.threadId }}/chat/',
					},
				},
			},
		],
		default: 'sendMessage',
	},
	...chatSendMessageDescription,
	...chatSendMessageInThreadDescription,
];
