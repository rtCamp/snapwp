import { QueryEngine } from '@snapwp/query';
import type { RouteFetcher } from '../types';

/**
 * Fetches and parses Open Graph metadata for a given route.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed Open Graph metadata.
 */
const fetchRouteOpenGraphMetadata: RouteFetcher =
	QueryEngine.fetchRouteOpenGraphMetadata;

export default fetchRouteOpenGraphMetadata;
