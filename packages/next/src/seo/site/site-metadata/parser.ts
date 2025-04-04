import type { Parser } from '../types';
import type { SiteMetadataFragFragment } from '@snapwp/query';

/**
 * Parses fragment into metadata format consumable by next
 *
 * @param {SiteMetadataFragFragment} data - The data to parse.
 * @return The parsed root metadata.
 */
const parseSiteMetadata: Parser< SiteMetadataFragFragment > = ( data ) => {
	if ( ! data.generalSettings ) {
		return {};
	}
	return {
		title: data.generalSettings.title,
		description: data.generalSettings.description,
		openGraph: {
			locale: data.generalSettings.language
				? data.generalSettings.language
				: undefined,
		},
	};
};

export default parseSiteMetadata;
