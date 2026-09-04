import type { INodeProperties } from 'n8n-workflow';
import { projectIdField } from '../../shared/descriptions';
import { chatAdditionalFields, chatQueryField } from './shared';

const showOnlyForChatSendMessage = {
	operation: ['sendMessage'],
	resource: ['chat'],
};

export const chatSendMessageDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForChatSendMessage }),
	chatQueryField({ show: showOnlyForChatSendMessage }),
	chatAdditionalFields({ show: showOnlyForChatSendMessage }),
];
