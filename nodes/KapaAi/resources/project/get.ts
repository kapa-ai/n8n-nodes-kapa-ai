import type { INodeProperties } from 'n8n-workflow';
import { projectIdField } from '../../shared/descriptions';

const showOnlyForProjectGet = {
	operation: ['get'],
	resource: ['project'],
};

export const projectGetDescription: INodeProperties[] = [
	projectIdField({ show: showOnlyForProjectGet }),
];
