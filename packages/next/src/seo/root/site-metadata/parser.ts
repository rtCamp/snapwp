import type { SiteMetadata } from './types';
import type { Parser } from '@/seo/types';

/**
 * Parses the root metadata from the given data.
 *
 * @param data - The data to parse.
 * @return The parsed root metadata.
 */
const parseSiteMetadata: Parser< SiteMetadata > = ( data ) => {
	const { siteTitle, description, locale } = data;
	return {
		title: siteTitle,
		description,
		openGraph: {
			locale,
		},
	};
};

export default parseSiteMetadata;
