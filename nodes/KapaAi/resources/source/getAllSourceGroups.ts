import type { INodeProperties } from 'n8n-workflow';
import {
	limitField,
	pagePagination,
	projectIdField,
	returnAllField,
} from '../../shared/descriptions';

const showOnlyForSourceGroupGetMany = {
	operation: ['getAllSourceGroups'],
	resource: ['source'],
};

export const sourceGroupGetManyDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForSourceGroupGetMany }),
	returnAllField({ show: showOnlyForSourceGroupGetMany }, { pagination: pagePagination }),
	limitField(
		{ show: { ...showOnlyForSourceGroupGetMany, returnAll: [false] } },
		{ sendPageSize: true },
	),
];
