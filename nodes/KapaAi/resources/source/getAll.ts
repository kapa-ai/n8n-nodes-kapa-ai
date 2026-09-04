import type { INodeProperties } from 'n8n-workflow';
import {
	limitField,
	pagePagination,
	projectIdField,
	returnAllField,
} from '../../shared/descriptions';

const showOnlyForSourceGetMany = {
	operation: ['getAll'],
	resource: ['source'],
};

export const sourceGetManyDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForSourceGetMany }),
	returnAllField({ show: showOnlyForSourceGetMany }, { pagination: pagePagination }),
	limitField({ show: { ...showOnlyForSourceGetMany, returnAll: [false] } }, { sendPageSize: true }),
];
