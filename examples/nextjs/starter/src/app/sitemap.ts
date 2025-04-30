import type { MetadataRoute } from 'next';
import {
	getSitemapPaths as generateSitemaps,
	generateSubSitemaps,
} from '@snapwp/next';

export { generateSitemaps };

export default async function sitemap( {
	id,
}: {
	id: string;
} ): Promise< MetadataRoute.Sitemap > {
	return await generateSubSitemaps( id );
}

// @todo: This will be replaced with on-demand revalidation using revalidateTag or revalidatePath once webhooks are implemented.
// Revalidate the sitemap every 10 minutes
export const revalidate = 60 * 10; // 10 minutes
