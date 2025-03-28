import { QueryEngine } from '@snapwp/query';
import { GlobalHead } from './global-head';
import type { Metadata } from 'next';
import type { PropsWithChildren, ReactNode } from 'react';
import { getRootMetadata } from '@/seo/root';

export type RootLayoutProps = {
	getGlobalStyles?: ( typeof QueryEngine )[ 'getGlobalStyles' ];
};

/**
 * The RootLayout to be used in a NextJS app.
 * @param props - The props for the renderer.
 * @param props.getGlobalStyles - A async callback to get global styles.
 * @param props.children - Child components.
 *
 * @return The rendered template.
 */
export async function RootLayout( {
	getGlobalStyles = QueryEngine.getGlobalStyles,
	children,
}: PropsWithChildren< RootLayoutProps > ): Promise< ReactNode > {
	const globalHeadProps = await getGlobalStyles();

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
	const rootMetadata = await getRootMetadata();

	return rootMetadata;
}
