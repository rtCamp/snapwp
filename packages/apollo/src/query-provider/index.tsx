'use client';

import {
	ApolloProvider,
	type ApolloClient,
	type NormalizedCacheObject,
} from '@apollo/client';
import { type JSX, type PropsWithChildren } from 'react';

/**
 * Apollo Query Provider component.
 *
 * @param {Object} root0 - The root object.
 * @param {ReactNode | undefined} root0.children - The child components.
 * @param {ApolloClient< NormalizedCacheObject >} root0.client - The Apollo Client instance.
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
