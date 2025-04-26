import type { MetadataRoute } from 'next';
import {
	generateSitemaps as generateWPSitemaps,
	generateSubSitemaps,
} from '@snapwp/next';

export async function generateSitemaps() {
	return await generateWPSitemaps();
}

export default async function sitemap( {
	id,
}: {
	id: string;
} ): Promise< MetadataRoute.Sitemap > {
	return await generateSubSitemaps( id );
}
