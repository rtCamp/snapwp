import { getConfig } from '@snapwp/core/config';
import type { OpenGraphMetadata } from './types';
import type { RouteParser } from '../types';

/**
 * Parses the Open Graph metadata for a specific route.
 *
 * @param _path - The route path associated with the metadata.
 * @param data - The data to parse for Open Graph information.
 * @return Parsed Open Graph metadata for the given route.
 */
const parseRouteOpenGraphMetadata: RouteParser< OpenGraphMetadata > = (
	_path,
	data
) => {
	const { frontendUrl } = getConfig();

	const {
		title,
		type,
		images,
		publishedTime,
		modifiedTime,
		description,
		url,
	} = data;

	return {
		openGraph: {
			title,
			url: `${ frontendUrl }${ url }`,
			...( type && { type } ),
			images,
			publishedTime,
			modifiedTime,
			description,
		},
	};
};

export default parseRouteOpenGraphMetadata;
