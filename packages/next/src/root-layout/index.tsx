import { QueryEngine } from '@snapwp/query';
import { GlobalHead } from './global-head';
import { getIcons } from './icons-metadata';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { QueryEngineRegistry } from '@/query-engine-registry';

/**
 * The RootLayout to be used in a NextJS app.
 * @param props - The props for the renderer.
 * @param props.children - Child components.
 *
 * @return The rendered template
 */
export async function RootLayout( { children }: PropsWithChildren< {} > ) {
	const queryEngine = QueryEngineRegistry.getInstance().getQueryEngine();
	const globalHeadProps =
		await QueryEngine.getInstance( queryEngine ).getGlobalStyles();

	return (
		<html lang="en">
			<head>
				<GlobalHead { ...globalHeadProps } />
			</head>
			{ /* suppressHydrationWarning is added to suppress warnings when classes for body are updated on the client */ }
			<body suppressHydrationWarning>{ children }</body>
		</html>
	);
}

/**
 * Generate and return root metadata, including icons and other metadata.
 *
 * @return Merged metadata.
 */
export async function generateRootMetaData(): Promise< Metadata > {
	/**
	 * Fetch icons in required format, apply faviconIcons and apple touch icons in icons metadata property while apply msapplication-TileImage in other metadata property.
	 *
	 * @todo Review composability when implementing SEO metadata
	 */
	const { faviconIcons, appleIcons, msApplicationTileIcon } =
		await getIcons();

	return {
		icons: {
			icon: faviconIcons,
			apple: appleIcons,
		},
		other: {
			...( msApplicationTileIcon && {
				'msapplication-TileImage': msApplicationTileIcon.sourceUrl,
			} ),
		},
	};
}
