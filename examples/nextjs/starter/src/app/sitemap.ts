import type { MetadataRoute } from 'next';
import {
	getSitemapPaths as generateSitemaps,
	generateSubSitemaps,
} from '@snapwp/next';

export { generateSitemaps };

/**
 * Generate a sitemap for a specific path.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * @param {string} id - The ID of the sitemap to generate.
 *
 * @return {Promise<MetadataRoute.Sitemap>} - The generated sitemap.
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
