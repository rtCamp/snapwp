import type { QueryClientAdapter } from '@snapwp/types';
import { getConfig } from '@snapwp/core/config';

/**
 * Query Engine Registry
 */
export class QueryAdapterRegistry {
	private static _adapter: QueryClientAdapter | undefined;

	/**
	 * Get the query engine
	 *
	 * @return The query engine
	 */
	public static get adapter(): QueryClientAdapter {
		if ( ! QueryAdapterRegistry._adapter ) {
			const { queryEngine } = getConfig();

			if ( ! queryEngine ) {
				throw new Error( 'Query adapter is not registered' );
			}

			QueryAdapterRegistry.adapter = queryEngine;
		}
		return QueryAdapterRegistry._adapter!;
	}

	/**
	 * Set the query engine
	 */
	private static set adapter( queryEngine: QueryClientAdapter ) {
		QueryAdapterRegistry._adapter = queryEngine;
	}
}
