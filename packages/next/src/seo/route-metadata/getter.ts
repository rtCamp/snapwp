import { QueryEngine } from '@snapwp/query';
import type { GetRouteMetadata } from '@snapwp/types';
import parseRouteMetadata from './parser';
import { getRouteOpenGraphMetadata, getRouteTwitterMetadata } from '..';

/**
 * Fetches and parses the route metadata, including Open Graph and Twitter metadata.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional configuration for fetching and parsing metadata.
 * @return Combined metadata including Open Graph, Twitter, and route-specific details.
 */
const getRouteMetadata: GetRouteMetadata = async ( path, options ) => {
	const {
		getRouteOpenGraphMetadataOptions,
		getRouteTwitterMetadataOptions,
		fetchMetadata,
		parseMetadata,
	} = options || {};

	const fetcher = fetchMetadata || QueryEngine.fetchRouteMetadata;
	const parser = parseMetadata || parseRouteMetadata;

	const [ openGraphMetadata, twitterMetadata ] = await Promise.all( [
		getRouteOpenGraphMetadata( path, getRouteOpenGraphMetadataOptions ),
		getRouteTwitterMetadata( path, getRouteTwitterMetadataOptions ),
	] );
	const metadata = await fetcher( path );
	const parsedMetadata = parser( metadata );

	return {
		...openGraphMetadata,
		...twitterMetadata,
		...parsedMetadata,
	};
};

export default getRouteMetadata;
