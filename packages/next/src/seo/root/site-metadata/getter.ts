import { QueryEngine } from '@snapwp/query';
import parseRootMetadata from './parser';
import type { SiteMetadata } from './types';
import type { Getter } from '../type';

/**
 * Retrieves the Site metadata using the provided options.
 *
 * @param options - Options for fetching and parsing Site metadata.
 * @return A promise resolving to the Site metadata.
 */
const getSiteMetadata: Getter< SiteMetadata > = async ( options = {} ) => {
	const {
		fetcher = QueryEngine.fetchSiteMetadata,
		parser = parseRootMetadata,
	} = options;

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

export default getSiteMetadata;
