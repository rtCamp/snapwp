# Sitemap

SnapWP automatically generates a sitemap for your site using WordPress as the source of truth. The sitemap is built using data fetched directly from your WordPress backend and updates automatically whenever your content changes—no redeploys needed.

## Index Sitemap

In the example Next.js starter app, the main sitemap is available at `/wp-sitemap.xml`, just like WordPress default.

### How to Change the Index Sitemap Path in Next.js

If you'd like to change the path (e.g., to `/sitemap_index.xml`), follow these steps:

1. Create a directory in `app/` named `sitemap_index.xml`.
2. Inside it, create a file named `route.ts`.
3. Add the following logic:

```ts
// route.ts

import { NextResponse } from 'next/server';
import { generateIndexSitemap } from '@snapwp/next';

export async function GET(): Promise< NextResponse > {
	const sitemaps = await generateIndexSitemap();

	const xml = buildXmlFromSitemaps( sitemaps ); // Build <sitemapindex> XML from list

	return new NextResponse( xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	} );
}
```

> The function `generateIndexSitemap()` returns an array of sitemap objects. You can map over them to build the final XML structure.

---

## Sub-sitemaps

SnapWP supports automatic generation of sub-sitemaps (for posts, pages, custom post types, etc.) using the `app/sitemap.ts` file.

### File: `app/sitemap.ts`

```ts
// app/sitemap.ts

import type { MetadataRoute } from 'next';
import { getSitemapPaths, generateSubSitemaps } from '@snapwp/next';

// This function returns an array of sitemap IDs from WordPress
export const generateSitemaps = async () => {
	return await getSitemapPaths();
};

// This function generates the XML for each sitemap based on the ID
export default async function sitemap( { id }: { id: string } ) {
	return await generateSubSitemaps( id );
}

// Always render fresh sitemap content
export const revalidate = 0;
```

### What Each Function Does

-   **`getSitemapPaths()`** → Fetches all available sitemap IDs (e.g., `wp-sitemap-posts-post-1`, `wp-sitemap-pages-page-1`) from the WordPress sitemap index.
-   **`generateSubSitemaps(id)`** → Generates the XML content for the specified sitemap ID by fetching the sub-sitemap and mapping the URLs.
-   **`revalidate = 0`** → Disables static caching to ensure the sitemap is always generated fresh on every request.
