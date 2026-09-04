import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFeedbackUpsert = {
	operation: ['upsert'],
	resource: ['feedback'],
};

export const feedbackUpsertDescription: INodeProperties[] = [
	{
		displayName: 'Question Answer ID',
		name: 'questionAnswer',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 4b1c2e6a-1f8d-4a3b-9c7e-2d5f8a0b3c1d',
		description: 'The question answer the feedback belongs to',
		displayOptions: {
			show: showOnlyForFeedbackUpsert,
		},
		routing: {
			send: {
				type: 'body',
				property: 'question_answer',
			},
		},
	},
	{
		displayName: 'Reaction',
		name: 'reaction',
		type: 'options',
		default: 'upvote',
		required: true,
		description: 'How the user reacted to the answer',
		displayOptions: {
			show: showOnlyForFeedbackUpsert,
		},
		options: [
			{
				name: 'Downvote',
				value: 'downvote',
			},
			{
				name: 'Upvote',
				value: 'upvote',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'reaction',
			},
		},
	},
	{
		displayName: 'User Identifier',
		name: 'userIdentifier',
		type: 'string',
		default: '',
		required: true,
		description:
			'Stable identifier for the user leaving the feedback, for example a browser fingerprint or your own user ID',
		displayOptions: {
			show: showOnlyForFeedbackUpsert,
		},
		routing: {
			send: {
				type: 'body',
				property: 'user_identifier',
			},
		},
	},
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: showOnlyForFeedbackUpsert,
		},
		description: 'Why the answer was unsatisfactory. Only send this alongside a downvote.',
		options: [
			{
				displayName: 'Comment',
				name: 'commentValues',
				values: [
					{
						displayName: 'Issue',
						name: 'issue',
						type: 'string',
						default: '',
						typeOptions: {
							rows: 2,
						},
						description: 'The issue as described by the user. Can be left empty.',
					},
					{
						displayName: 'Incorrect',
						name: 'incorrect',
						type: 'boolean',
						default: false,
						description: 'Whether the user marked the answer as incorrect',
					},
					{
						displayName: 'Irrelevant',
						name: 'irrelevant',
						type: 'boolean',
						default: false,
						description:
							'Whether the user marked the answer as irrelevant, meaning it contains details that do not apply',
					},
					{
						displayName: 'Unaddressed',
						name: 'unaddressed',
						type: 'boolean',
						default: false,
						description: 'Whether the user marked the answer as not addressing the question',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'comment',
				value: '={{ $value.commentValues }}',
			},
		},
	},
];
