'use client';

import {
	type ApolloClient,
	ApolloProvider,
	type NormalizedCacheObject,
} from '@apollo/client';
import { type JSX, type PropsWithChildren } from 'react';

/**
 * Apollo Query Provider component.
 *
 * @param root0 - The root object.
 * @param root0.children - The child components.
 * @param root0.client - The Apollo Client instance.
 *
 * @return The rendered ApolloProvider component.
 */
export const ApolloQueryProvider: ( {
	client,
	children,
}: React.PropsWithChildren< {
	client: ApolloClient< NormalizedCacheObject >;
} > ) => JSX.Element = ( {
	client,
	children,
}: PropsWithChildren< {
	client: ApolloClient< NormalizedCacheObject >;
} > ) => {
	return <ApolloProvider client={ client }>{ children }</ApolloProvider>;
};
