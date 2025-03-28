import { QueryEngine } from '@snapwp/query';
import parseRouteTwitterMetadata from './parser';
import type { Getter } from '../type';
import type { TwitterMetadata } from './types';

/**
 * Fetches and parses Twitter metadata for a given route.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed Twitter metadata.
 */
const getRouteTwitterMetadata: Getter< TwitterMetadata > = async (
	path = '/',
	options = {}
) => {
	const {
		fetcher = QueryEngine.fetchRouteTwitterMetadata,
		parser = parseRouteTwitterMetadata,
	} = options;

	const metadata = await fetcher( path );
	const { image, description, title } = parser( path, metadata );
	return {
		twitter: {
			title,
			description,
			...( image && { images: [ image ] } ),
		},
	};
};

export default getRouteTwitterMetadata;
