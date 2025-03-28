import { z } from 'zod';
import FeaturedImageSchema from '../schema';

/**
 * Schema for validating route metadata.
 */
export const RouteMetadataSchema = z.object( {
	nodeByUri: z
		.object( {
			__typename: z.enum( [ 'Category', 'Page', 'Post', 'Tag', 'User' ] ),
			name: z.string().nullable().optional(),
			title: z.string().nullable().optional(),
			description: z.string().nullable().optional(),
			uri: z.string().nullable().optional(),
			date: z.string().nullable().optional(),
			modified: z.string().nullable().optional(),
			content: z.string().nullable().optional(),
			excerpt: z.string().nullable().optional(),
			author: z
				.object( {
					node: z
						.object( {
							name: z.string().nullable().optional(),
						} )
						.nullable()
						.optional(),
				} )
				.nullable()
				.optional(),
			featuredImage: FeaturedImageSchema,
		} )
		.nullable()
		.optional(),
} );
