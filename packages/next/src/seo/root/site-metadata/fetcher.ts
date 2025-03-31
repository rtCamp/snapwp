import { QueryEngine } from '@snapwp/query';
import type { Fetcher } from '@/seo/types';

/**
 * Retrieves the Site metadata using the provided options.
 *
 * @param options - Options for fetching and parsing Site metadata.
 * @return A promise resolving to the Site metadata.
 */
const fetchSiteMetadata: Fetcher = QueryEngine.fetchSiteMetadata;

export default fetchSiteMetadata;
