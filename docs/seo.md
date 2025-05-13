# SEO Metadata

SnapWP exports two main functions to add meta tags for SEO:

-   `getLayoutMetadata`: Gets SEO data for the site.
-   `getPageMetadata`: Gets SEO data related to the template. Adds update icon

## Registering a new plugin

The SEO functionality can be extended by registering new plugins. Below is an example of updated root layout.

```typescript
import { RootLayout } from '@snapwp/next';
import { getLayoutMetadata, Seo } from '@snapwp/next/seo';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

// Register a plugin before calling function `getLayoutMetadata`
Seo.registerPlugin(
	{
		fragment: PluginFragmentDoc,
		parseMetadata: parserFunction,
		location:'page'
	}
);

export default function Layout( { children }: PropsWithChildren ) {
	return (
		<RootLayout>
			<>{ children }</>
		</RootLayout>
	);
}

/**
 * Generate site meta data.
 * @return Metadata for SEO.
 */
export async function generateMetadata(): Promise< Metadata > {
	const metadata = await getLayoutMetadata();

	return {
		...metadata,
	};
}
```

## Anatomy of a SEO plugin

An plugin requires 3 things to be registered.

-   **Fragment** to define the data needed from the WP server.
-   **Parser** to parse the fragment data to be consumable by NextJS.
-   **Location** has value of either `page` or `layout`. This defines if the parsed meta data should be added to the returned value of `getPageMetadata` or `getLayoutMetadata`.

> [!Note]
> If a plugin is defined to have the location `page` the fragment should be on `RootQuery` and for `layout` it should be a fragment of `RenderedTemplate`.
