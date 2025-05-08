import { NextResponse } from 'next/server';
import { generateIndexSitemap } from '@snapwp/next';

/**
 * Generate a sitemap index for all sitemaps.
 *
 * @return {Promise<NextResponse>} - The generated sitemap index.
 */
export async function GET(): Promise< NextResponse > {
	const sitemaps = await generateIndexSitemap();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
		<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${ sitemaps
				.map(
					( sitemap ) => `
						<sitemap>
							<loc>${ sitemap.url }</loc>
						</sitemap>
					`
				)
				.join( '' ) }
		</sitemapindex>`;

	return new NextResponse( xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	} );
}
