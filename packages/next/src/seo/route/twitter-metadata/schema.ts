import { z } from 'zod';
import FeaturedImageSchema from '../schema';

/**
 * Schema for validating route Twitter metadata.
 */
export const RouteTwitterMetadataSchema = z.object( {
	nodeByUri: z
		.object( {
			__typename: z.enum( [ 'Page', 'Post' ] ),
			title: z.string().nullable().optional(),
			description: z.string().nullable().optional(),
			featuredImage: FeaturedImageSchema,
		} )
		.nullable()
		.optional(),
} );
