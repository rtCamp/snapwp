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
 * @param { Object } props - The root object.
 * @param { ReactNode | undefined } props.children - The child components.
 * @param { ApolloClient< NormalizedCacheObject > } props.client - The Apollo Client instance.
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
