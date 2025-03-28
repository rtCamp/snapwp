import { z } from 'zod';
/**
 * Schema for validating Icons metadata.
 */
export const IconsMetaDataSchema = z.object( {
	generalSettings: z.object( {
		siteIcon: z.object( {
			mediaItemUrl: z.string().nullable().optional(),
			mediaDetails: z.object( {
				sizes: z.array(
					z.object( {
						sourceUrl: z.string(),
						height: z.string(),
						width: z.string(),
					} )
				),
			} ),
		} ),
	} ),
} );
