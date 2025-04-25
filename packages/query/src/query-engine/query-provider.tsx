import { Registry } from '@/query-engine/registry';
import type { JSX, PropsWithChildren } from 'react';

/**
 * QueryProvider component.
 *
 * @param {Object} root0 - The root object.
 * @param {React.ReactNode} root0.children - The child components.
 * @param {TClient} root0.client - The client instance.
 *
 * @return The rendered QueryProvider component.
 */
export function QueryProvider< TClient >( {
	children,
	client,
}: PropsWithChildren< { client: TClient } > ): JSX.Element {
	const EngineQueryProver = Registry.getEngine().QueryProvider;
	return (
		<EngineQueryProver client={ client }>{ children }</EngineQueryProver>
	);
}
