import type { SiteMetadata } from './types';
import type { Parser } from '../type';
import { RootMetadataSchema } from './schema';

/**
 * Parses the root metadata from the given data.
 *
 * @param data - The data to parse.
 * @return The parsed root metadata.
 */
const parseRootMetadata: Parser< SiteMetadata > = ( data ) => {
	const { generalSettings } = RootMetadataSchema.parse( data );
	const { title, description, language } = generalSettings || {};

	const result: SiteMetadata = {};
	if ( title ) {
		result.siteTitle = title;
	}
	if ( description ) {
		result.description = description;
	}
	if ( language ) {
		result.locale = language;
	}

	return result;
};

export default parseRootMetadata;
