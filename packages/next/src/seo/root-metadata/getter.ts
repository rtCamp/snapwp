import { QueryEngine } from '@snapwp/query';
import type { GetRootMetadata } from '@snapwp/types';
import parseRootMetadata from './parser';

/**
 * Fetches and parses the root metadata for the site.
 *
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed root metadata.
 */
const getRootMetadata: GetRootMetadata = async ( options ) => {
	const { fetchMetadata, parseMetadata } = options || {};
	const fetcher = fetchMetadata || QueryEngine.fetchRootMetadata;
	const parser = parseMetadata || parseRootMetadata;
	const metadata = await fetcher();
	const { siteTitle, description, locale } = parser( metadata );
	return {
		title: siteTitle,
		description,
		openGraph: {
			locale,
		},
	};
};

export default getRootMetadata;
