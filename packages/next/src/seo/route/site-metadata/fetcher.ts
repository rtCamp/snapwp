import { QueryEngine } from '@snapwp/query';
import type { RouteFetcher } from '../types';

/**
 * Fetches and parses the route metadata, including Open Graph and Twitter metadata.
 *
 * @param path - The route path to fetch metadata for.
 * @param options - Optional configuration for fetching and parsing metadata.
 * @return Combined metadata including Open Graph, Twitter, and route-specific details.
 */
const fetchRouteSiteMetadata: RouteFetcher = QueryEngine.fetchRouteMetadata;

export default fetchRouteSiteMetadata;
