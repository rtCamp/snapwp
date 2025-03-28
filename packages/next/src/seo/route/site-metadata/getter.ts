import { QueryEngine } from '@snapwp/query';
import parseRouteMetadata from './parser';
import type { GetSiteRouteMetadata } from '@snapwp/types';

/**
 * Fetches and parses the route metadata, including Open Graph and Twitter metadata.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional configuration for fetching and parsing metadata.
 * @return Combined metadata including Open Graph, Twitter, and route-specific details.
 */
const getSiteMetadata: GetSiteRouteMetadata = async ( path, options ) => {
	const { fetchMetadata, parseMetadata } = options || {};

	const fetcher = fetchMetadata || QueryEngine.fetchRouteMetadata;
	const parser = parseMetadata || parseRouteMetadata;

	const metadata = await fetcher( path );
	const parsedMetadata = parser( metadata );

	return parsedMetadata;
};

export default getSiteMetadata;
