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
