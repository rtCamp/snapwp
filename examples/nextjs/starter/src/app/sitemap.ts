import type { MetadataRoute } from 'next';
import { getSitemapPaths, generateSubSitemaps } from '@snapwp/next';

/**
 * Returns Sitemap IDs to be dynamically generated.
 *
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
 *
 * @return An array of Sitemap IDs.
 */
export const generateSitemaps = async (): Promise<
	Array< { id: string } >
> => {
	return await getSitemapPaths();
};

/**
 * Generate a sitemap for a specific path.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * @param root0 - The object containing the sitemap ID.
 * @param root0.id - The ID of the sitemap to generate.
 *
 * @return The generated sitemap.
 */
export default async function sitemap( {
	id,
}: {
	id: string;
} ): Promise< MetadataRoute.Sitemap > {
	return await generateSubSitemaps( id );
}

// @todo: This will be replaced with on-demand revalidation using revalidateTag or revalidatePath once webhooks are implemented.
// Keeping revalidation to 0 to render it dynamically always.
export const revalidate = 0;
