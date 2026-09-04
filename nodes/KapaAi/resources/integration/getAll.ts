import type { INodeProperties } from 'n8n-workflow';
import { limitField, projectIdField, returnAllField } from '../../shared/descriptions';

const showOnlyForIntegrationGetMany = {
	operation: ['getAll'],
	resource: ['integration'],
};

export const integrationGetManyDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForIntegrationGetMany }),
	returnAllField({ show: showOnlyForIntegrationGetMany }),
	limitField({ show: { ...showOnlyForIntegrationGetMany, returnAll: [false] } }),
];
