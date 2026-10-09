import type {
	IDataObject,
	IN8nRequestOperationPaginationGeneric,
	INode,
	INodeTypes,
	IWorkflowDataProxyAdditionalKeys,
} from 'n8n-workflow';
import { Workflow } from 'n8n-workflow';
import { describe, expect, it } from 'vitest';
import {
	commaSeparatedToArray,
	documentsPagination,
	omitIfBlank,
} from '../nodes/KapaAi/shared/descriptions';

const node: INode = {
	id: '1',
	name: 'Kapa AI',
	type: '@kapaai/n8n-nodes-kapa-ai.kapaAi',
	typeVersion: 1,
	position: [0, 0],
	parameters: {},
};

const nodeTypes = {
	getByName: () => undefined,
	getByNameAndVersion: () => ({ description: { properties: [] } }),
	getKnownTypes: () => ({}),
} as unknown as INodeTypes;

const workflow = new Workflow({ nodes: [node], connections: {}, active: false, nodeTypes });

function evaluate(expression: string, additionalKeys: IWorkflowDataProxyAdditionalKeys) {
	return workflow.expression.getParameterValue(
		expression,
		null,
		0,
		0,
		node.name,
		[{ json: {} }],
		'manual',
		additionalKeys,
		{ node, data: { main: [[{ json: {} }]] }, source: null },
	);
}

const pagination = documentsPagination.pagination as IN8nRequestOperationPaginationGeneric;
const continueExpression = pagination.properties.continue as string;
const nextPageBody = pagination.properties.request.body as unknown as string;

function shouldContinue(requestBody: IDataObject, responseBody?: IDataObject) {
	return evaluate(continueExpression, {
		$request: { body: requestBody },
		$response: responseBody ? { body: responseBody } : undefined,
	});
}

describe('commaSeparatedToArray', () => {
	it('trims entries and drops blanks', () => {
		expect(evaluate(commaSeparatedToArray, { $value: 'a, b ,,c' })).toEqual(['a', 'b', 'c']);
	});

	it('omits the field when nothing remains', () => {
		expect(evaluate(commaSeparatedToArray, { $value: '' })).toBeUndefined();
		expect(evaluate(commaSeparatedToArray, { $value: ' , ' })).toBeUndefined();
	});
});

describe('omitIfBlank', () => {
	it('omits an empty value and keeps a filled one', () => {
		expect(evaluate(omitIfBlank, { $value: '' })).toBeUndefined();
		expect(evaluate(omitIfBlank, { $value: 'x' })).toBe('x');
	});
});

describe('documentsPagination', () => {
	const sixUrls = ['a', 'b', 'c', 'd', 'e', 'f'];

	it('continues past a page with no matches while requests remain', () => {
		expect(
			shouldContinue({ urls: sixUrls }, { page: 1, page_size: 5, total_items: 0, documents: [] }),
		).toBe(true);
	});

	it('stops once every requested entry has been paged over', () => {
		expect(shouldContinue({ urls: sixUrls }, { page: 2, page_size: 5, total_items: 1 })).toBe(
			false,
		);
	});

	it('stops when the requested count ends exactly on a page boundary', () => {
		expect(
			shouldContinue(
				{ urls: ['a', 'b', 'c', 'd', 'e'] },
				{ page: 1, page_size: 5, total_items: 5 },
			),
		).toBe(false);
	});

	it('counts duplicate URLs once', () => {
		expect(
			shouldContinue(
				{ urls: ['a', 'a', 'b', 'b', 'c', 'c'] },
				{ page: 1, page_size: 5, total_items: 3 },
			),
		).toBe(false);
	});

	it('counts URLs that differ only after # separately', () => {
		expect(
			shouldContinue(
				{ urls: ['a#1', 'a#2', 'b', 'c', 'd', 'e'] },
				{ page: 1, page_size: 5, total_items: 5 },
			),
		).toBe(true);
	});

	it('counts IDs that differ only by case once', () => {
		expect(
			shouldContinue(
				{ document_ids: ['AAAA', 'aaaa', 'bbbb', 'cccc', 'dddd', 'eeee'] },
				{ page: 1, page_size: 5, total_items: 5 },
			),
		).toBe(false);
	});

	it('pages over IDs alone', () => {
		expect(
			shouldContinue({ document_ids: sixUrls }, { page: 1, page_size: 5, total_items: 5 }),
		).toBe(true);
	});

	it('adds the URL and ID counts together', () => {
		expect(
			shouldContinue(
				{ urls: ['a', 'b', 'c'], document_ids: ['d', 'e', 'f'] },
				{ page: 1, page_size: 5, total_items: 5 },
			),
		).toBe(true);
	});

	it('stops without a response body', () => {
		expect(shouldContinue({ urls: ['a'] })).toBe(false);
	});

	it('requests the next page with the original body', () => {
		expect(
			evaluate(nextPageBody, {
				$request: { body: { urls: ['a'], max_chars_per_document: 10 } },
				$response: { body: { page: 1 } },
			}),
		).toEqual({ urls: ['a'], max_chars_per_document: 10, page: 2 });
	});

	it('requests page one when no page has been fetched', () => {
		expect(evaluate(nextPageBody, { $request: { body: { urls: ['a'] } } })).toEqual({
			urls: ['a'],
			page: 1,
		});
	});
});
