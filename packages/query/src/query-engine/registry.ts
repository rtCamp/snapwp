import { getConfig } from '@snapwp/core/config';
import type { QueryArgs, QueryEngine } from '@snapwp/types';

/**
 * Registry class to manage the registration of query engines.
 */
class Registry {
	/**
	 * Holds the registered query engines.
	 */
	private static engine?: QueryEngine< unknown >;

	/**
	 * Registers a query engine.
	 */
	private static register(): void {
		const { query } = getConfig();
		if ( ! query || ! query.engine ) {
			throw new Error( 'No query engine found in the config.' );
		}
		const queryConfigOptions = query.options;
		this.engine = new query.engine( queryConfigOptions );
	}

	/**
	 * Returns the registered query engine.
	 *
	 * @return The registered query engine.
	 */
	public static getEngine< TClient >(): QueryEngine< TClient > {
		if ( ! this.engine ) {
			this.register();
		}

		return < QueryEngine< TClient > >this.engine;
	}
}

/**
 * Returns a client instance for the query engine.
 *
 * @param {TClient} client - The client instance to be used.
 *
 * @throws {Error} If no query engine is found in the config.
 *
 * @return {TClient} The client instance for the query engine.
 */
export const useClient = < TClient >(
	client: TClient | undefined
): TClient | undefined => {
	const engine = Registry.getEngine< TClient >();
	return engine.useClient( client );
};

/**
 * Returns a server client instance for the query engine.
 *
 * @throws {Error} If no query engine is found in the config.
 *
 * @return {TClient} The server client instance for the query engine.
 */
export const getClient = < TClient >(): TClient => {
	const engine = Registry.getEngine< TClient >();
	return engine.getClient();
};

/**
 * Perform a server-safe data fetch using the GraphQL client.
 *
 * @typeParam TData - The shape of the response data.
 * @param { Object } args - Object containing:
 *   - key: Unique cache key for the query.
 *   - query: The GraphQL document (typed or untyped).
 *   - options: Client-specific query options (kept unknown to allow flexibility; implementers can define stricter types).
 * @return A promise resolving with the queried data.
 */
export const fetchQuery = <
	TData,
	TQueryVars extends { [ key: string ]: unknown },
>(
	args: QueryArgs< TData, TQueryVars >
): Promise< TData > => {
	const engine = Registry.getEngine();
	return engine.fetchQuery( args );
};

/**
 * React hook for client-side GraphQL queries.
 *
 * @typeParam TData - The shape of the response data.
 * @param { Object } args - Object containing:
 *   - key: Unique cache key for the query.
 *   - query: The GraphQL document (typed or untyped).
 *   - options: Client-specific query options (kept unknown to allow flexibility; implementers can define stricter types).
 * @return The queried data.
 */
export const useQuery = <
	TData,
	TQueryVars extends { [ key: string ]: unknown },
>(
	args: QueryArgs< TData, TQueryVars >
): TData => {
	const engine = Registry.getEngine();
	return engine.useQuery( args );
};

export const QueryProvider = Registry.getEngine().QueryProvider;

export { Registry };
