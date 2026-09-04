import type { INodeProperties } from 'n8n-workflow';

const showOnlyForThreadGet = {
	operation: ['get'],
	resource: ['thread'],
};

export const threadGetDescription: INodeProperties[] = [
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 4b1c2e6a-1f8d-4a3b-9c7e-2d5f8a0b3c1d',
		description: 'The thread to retrieve',
		displayOptions: {
			show: showOnlyForThreadGet,
		},
	},
];
