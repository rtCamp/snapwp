import { QueryEngine } from '@snapwp/query';
import type { RouteFetcher } from '@/seo/types';

/**
 * Fetches and parses Twitter metadata for a given route.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed Twitter metadata.
 */
const fetchRouteTwitterMetadata: RouteFetcher =
	QueryEngine.fetchRouteTwitterMetadata;

export default fetchRouteTwitterMetadata;
