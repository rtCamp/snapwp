import { QueryEngine } from '@snapwp/query';
import type { GetRouteOpenGraphMetadata } from '@snapwp/types';
import parseOpenGraphMetadata from './parser';
import { getConfig } from '@snapwp/core/config';

/**
 * Fetches and parses Open Graph metadata for a given route.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed Open Graph metadata.
 */
const getRouteOpenGraphMetadata: GetRouteOpenGraphMetadata = async (
	path,
	options
) => {
	const { fetchMetadata, parseMetadata } = options || {};
	const fetcher = fetchMetadata || QueryEngine.fetchRouteOpenGraphMetadata;
	const parser = parseMetadata || parseOpenGraphMetadata;
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
