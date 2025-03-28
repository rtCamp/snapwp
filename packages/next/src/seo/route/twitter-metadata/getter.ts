import { QueryEngine } from '@snapwp/query';
import type { GetRouteTwitterMetadata } from '@snapwp/types';
import parseRouteTwitterMetadata from './parser';

/**
 * Fetches and parses Twitter metadata for a given route.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed Twitter metadata.
 */
const getRouteTwitterMetadata: GetRouteTwitterMetadata = async (
	path,
	options
) => {
	const { fetchMetadata, parseMetadata } = options || {};
	const fetcher = fetchMetadata || QueryEngine.fetchRouteTwitterMetadata;
	const parser = parseMetadata || parseRouteTwitterMetadata;
	const metadata = await fetcher( path );
	const { image, description, title } = parser( metadata );
	return {
		twitter: {
			title,
			description,
			...( image && { images: [ image ] } ),
		},
	};
};

export default getRouteTwitterMetadata;
