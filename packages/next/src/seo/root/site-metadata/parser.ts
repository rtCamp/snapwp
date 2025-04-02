import type { SiteMetadataFragFragment } from '@snapwp/query';
import type { Parser } from '../types';

/**
 * Parses fragment into metadata format consumable by next
 *
 * @param data - The data to parse.
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
