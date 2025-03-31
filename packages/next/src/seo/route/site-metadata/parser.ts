import type { Metadata } from 'next';
import type { SiteMetadata } from './types';
import type { RouteParser } from '../types';

/**
 * Fetches and parses the route metadata, including Open Graph and Twitter metadata.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional configuration for fetching and parsing metadata.
 * @param data
 * @return Combined metadata including Open Graph, Twitter, and route-specific details.
 */
const parseRouteSiteMetadata: RouteParser< SiteMetadata > = (
	data: unknown
) => {
	return data as Metadata;
};

export default parseRouteSiteMetadata;
