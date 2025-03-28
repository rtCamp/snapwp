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
