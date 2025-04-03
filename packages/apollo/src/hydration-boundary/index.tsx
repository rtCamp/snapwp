import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { type PropsWithChildren } from 'react';
import { getDataFromTree } from '@apollo/client/react/ssr';

/**
 * Hydration boundary for Apollo Query.
 * @param root0 - The root object.
 * @param root0.children - The child components.
 * @param root0.client - The QueryClient instance.
 *
 * @return The rendered HydrationBoundary component.
 */
export const ApolloHydrationBoundary: ( {
	children,
	client,
}: React.PropsWithChildren< {
	client: ApolloClient< NormalizedCacheObject >;
} > ) => Promise< React.JSX.Element > = async ( {
	children,
	client,
}: PropsWithChildren< {
	client: ApolloClient< NormalizedCacheObject >;
} > ) => {
	await getDataFromTree( children );
	const initialState = client.extract();

	return (
		<>
			{ children }
			<script
				dangerouslySetInnerHTML={ {
					__html: `window.__APOLLO_STATE__=${ JSON.stringify(
						initialState
					).replace( /</g, '\\u003c' ) };`,
				} }
			/>
		</>
	);
};
