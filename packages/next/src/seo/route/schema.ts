import { z } from 'zod';

/**
 * Schema for validating featured image data.
 */
const FeaturedImageSchema = z
	.object( {
		node: z
			.object( {
				sourceUrl: z.string().nullable().optional(),
				mediaDetails: z
					.object( {
						width: z.number().nullable().optional(),
						height: z.number().nullable().optional(),
					} )
					.nullable()
					.optional(),
			} )
			.nullable()
			.optional(),
	} )
	.nullable()
	.optional();

export default FeaturedImageSchema;
