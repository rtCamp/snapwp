import React, { PropsWithChildren } from 'react';
import { QueryEngine } from '@snapwp/query';
import { GlobalHead } from './global-head';

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
			{ /* suppressHydrationWarning is addes to suppress warnings when classes for body are updated on the client */ }
			<body suppressHydrationWarning={ true }>{ children }</body>
		</html>
	);
}
