import { z } from 'zod';
import FeaturedImageSchema from '../schema';

/**
 * Schema for validating route Open Graph metadata.
 */
export const RouteOpenGraphMetadataSchema = z.object( {
	nodeByUri: z
		.object( {
			__typename: z.enum( [ 'Category', 'Page', 'Post', 'Tag', 'User' ] ),
			name: z.string().nullable().optional(),
			description: z.string().nullable().optional(),
			uri: z.string().nullable().optional(),
			title: z.string().nullable().optional(),
			date: z.string().nullable().optional(),
			modified: z.string().nullable().optional(),
			content: z.string().nullable().optional(),
			excerpt: z.string().nullable().optional(),
			featuredImage: FeaturedImageSchema,
		} )
		.nullable()
		.optional(),
} );
