import { QueryEngine } from '@snapwp/query';
import parseRouteMetadata from './parser';
import type { SiteMetadata } from './types';
import type { RouteGetter } from '@/seo/types';

/**
 * Fetches and parses the route metadata, including Open Graph and Twitter metadata.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional configuration for fetching and parsing metadata.
 * @return Combined metadata including Open Graph, Twitter, and route-specific details.
 */
const getSiteMetadata: RouteGetter< SiteMetadata > = async (
	path = '/',
	options = {}
) => {
	const {
		fetcher = QueryEngine.fetchRouteMetadata,
		parser = parseRouteMetadata,
	} = options;

	const metadata = await fetcher( path );
	const parsedMetadata = parser( path, metadata );

	return parsedMetadata;
};

export default getSiteMetadata;
