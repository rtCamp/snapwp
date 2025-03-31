import { QueryEngine } from '@snapwp/query';
import parseOpenGraphMetadata from './parser';
import { getConfig } from '@snapwp/core/config';
import type { OpenGraphMetadata } from './types';
import type { RouteGetter } from '@/seo/types';

/**
 * Fetches and parses Open Graph metadata for a given route.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed Open Graph metadata.
 */
const getRouteOpenGraphMetadata: RouteGetter< OpenGraphMetadata > = async (
	path = '/',
	options = {}
) => {
	const {
		fetcher = QueryEngine.fetchRouteOpenGraphMetadata,
		parser = parseOpenGraphMetadata,
	} = options;

	const metadata = await fetcher( path );

	const {
		title,
		type,
		images,
		publishedTime,
		modifiedTime,
		description,
		url,
	} = parser( path, metadata );
	const { frontendUrl } = getConfig();

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

export default getRouteOpenGraphMetadata;
