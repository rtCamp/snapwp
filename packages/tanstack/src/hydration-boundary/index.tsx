import { type JSX, type PropsWithChildren } from 'react';
import { HydrationBoundary, type QueryClient } from '@tanstack/react-query';

/**
 * Hydration boundary for TanStack Query.
 * @param root0 - The root object.
 * @param root0.children - The child components.
 * @param root0.client - The QueryClient instance.
 *
 * @return The rendered HydrationBoundary component.
 */
export const TanStackHydrationBoundary: ( {
	children,
	client,
}: React.PropsWithChildren< { client: QueryClient } > ) => JSX.Element = ( {
	children,
	client,
}: PropsWithChildren< { client: QueryClient } > ) => {
	return (
		<HydrationBoundary queryClient={ client }>
			{ children }
		</HydrationBoundary>
	);
};
