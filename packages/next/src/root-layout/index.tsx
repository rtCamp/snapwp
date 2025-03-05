import React, { type PropsWithChildren } from 'react';
import { QueryEngine } from '@snapwp/query';
import { GlobalHead } from './global-head';
import type { Metadata } from 'next';

export type RootLayoutProps = {
	getGlobalStyles?: ( typeof QueryEngine )[ 'getGlobalStyles' ];
};

/**
 * The RootLayout to be used in a NextJS app.
 * @param props - The props for the renderer.
 * @param props.getGlobalStyles - A async callback to get global styles.
 * @param props.children - Child components.
 *
 * @return The rendered template
 */
export async function RootLayout( {
	getGlobalStyles = QueryEngine.getGlobalStyles,
	children,
}: PropsWithChildren< RootLayoutProps > ) {
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
 * Export our custom metadata like icons, manifest, SEO metadata etc.
 * This function can be async (https://nextjs.org/docs/app/api-reference/functions/generate-metadata#async-function) and we can also use fetch API or make a GraphQL request to fetch data from server.
 *
 * @return Merged metadata.
 */
export function generateRootMetaData(): Metadata {
	return {
		icons: generateIconsMetaData(),
	};
}

/**
 * Generate Icons metadata for nextJS
 *
 * @return Icons metadata.
 */
const generateIconsMetaData = (): Metadata[ 'icons' ] => {
	return {
		// This is an interim solution for the favicon.ico making a separate GraphQL request, we are setting # as icon so Browser won't make any default request to /favicon.ico path.
		// @todo: Once the site icon field is exposed make graphQL request to get that URL and replace it with # and remove these both comments.
		icon: '#',
	};
};
