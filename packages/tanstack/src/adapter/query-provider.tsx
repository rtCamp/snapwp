'use client';

import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { type JSX, type PropsWithChildren } from 'react';

/**
 * TanStack Query Provider component.
 * @param { Object } props - The root object.
 * @param { ReactNode | undefined } props.children - The child components.
 * @param { QueryClient } props.client - The TanStack Client instance.
 *
 * @return The rendered TanStackProvider component.
 */
export const TanStackQueryProvider: ( {
	client,
	children,
}: React.PropsWithChildren< {
	client: QueryClient;
} > ) => JSX.Element = ( {
	client,
	children,
}: PropsWithChildren< {
	client: QueryClient;
} > ) => {
	return (
		<QueryClientProvider client={ client }>
			{ children }
		</QueryClientProvider>
	);
};
