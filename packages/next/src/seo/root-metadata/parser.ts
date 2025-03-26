import {
	type ParseRootMetadata,
	type RootMetadata,
	RootMetadataSchema,
} from '@snapwp/types';

/**
 * Parses the root metadata from the given data.
 *
 * @param data - The data to parse.
 * @return The parsed root metadata.
 */
const parseRootMetadata: ParseRootMetadata = ( data ) => {
	const { generalSettings } = RootMetadataSchema.parse( data );
	const { title, description, language } = generalSettings || {};

	const result: RootMetadata = {};
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
