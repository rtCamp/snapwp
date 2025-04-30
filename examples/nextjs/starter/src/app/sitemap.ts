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
// Keeping revalidation to 0 to render it dynamically always.
export const revalidate = 0;
