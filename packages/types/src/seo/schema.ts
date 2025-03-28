import { z } from 'zod';

/**
 * Schema for validating root metadata.
 */
export const RootMetadataSchema = z.object( {
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
