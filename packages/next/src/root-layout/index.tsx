import { QueryEngine } from '@snapwp/query';
import { GlobalHead } from './global-head';

import type { PropsWithChildren, ReactNode } from 'react';

export type RootLayoutProps = {
	getGlobalStyles?: ( typeof QueryEngine )[ 'getGlobalStyles' ];
};

/**
 * The RootLayout to be used in a NextJS app.
 *
 * @param {Object}                             props                 The props for the renderer.
 * @param {RootLayoutProps['getGlobalStyles']} props.getGlobalStyles A async callback to get global styles.
 * @param {ReactNode}                          props.children        Child components.
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
