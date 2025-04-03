'use client';

import { type JSX, type PropsWithChildren } from 'react';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * TanStack Query Provider component.
 * @param root0 - The root object.
 * @param root0.children - The child components.
 * @param root0.client - The TanStack Client instance.
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
