import type { Validator } from '../types';
import type { SiteMetadata } from './types';

import { z } from 'zod';

/**
 * Schema for validating root metadata.
 */
export const SiteMetadataSchema = z.object( {
	generalSettings: z
		.object( {
			title: z.string().nullable().optional(),
			description: z.string().nullable().optional(),
			language: z.string().nullable().optional(),
		} )
		.nullable()
		.optional(),
} );

/**
 * Parses the root metadata from the given data.
 *
 * @param data - The data to parse.
 * @return The parsed root metadata.
 */
const validateSiteMetadata: Validator< SiteMetadata > = ( data ) => {
	const { generalSettings } = SiteMetadataSchema.parse( data );
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

export default validateSiteMetadata;
