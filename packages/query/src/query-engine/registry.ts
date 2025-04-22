import { getConfig } from '@snapwp/core/config';
import type { fetchQueryArgs, QueryEngine, useQueryArgs } from '@snapwp/types';

/**
 * Registry class to manage the registration of query engines.
 */
class Registry {
	/**
	 * Holds the registered query engines.
	 */
	private static engine?: QueryEngine;

	/**
	 * Registers a query engine.
	 */
	private static register(): void {
		const { query } = getConfig();
		this.engine = new query.engine();
		if ( ! this.engine ) {
			throw new Error( 'No query engine found in the config.' );
		}
	}

	/**
	 * Returns the registered query engine.
	 *
	 * @return The registered query engine.
	 */
	public static getEngine< TClient, TClientOptions >(): QueryEngine<
		TClient,
		TClientOptions
	> {
		if ( ! this.engine ) {
			this.register();
		}

		return < QueryEngine< TClient, TClientOptions > >this.engine;
	}
}

/**
 * Returns a client instance for the query engine.
 *
 * @param {TClientOptions} args - Arguments to be passed to the query engine.
 *
 * @throws {Error} If no query engine is found in the config.
 *
 * @return {TClient} The client instance for the query engine.
 */
export const getClient = < TClient, TClientOptions >(
	args: TClientOptions
): TClient => {
	const engine = Registry.getEngine< TClient, TClientOptions >();
	return engine.getClient( args );
};

/**
 * Returns a client instance for the query engine.
 *
 * @param {TClient} client - The client instance to be used.
 *
 * @throws {Error} If no query engine is found in the config.
 *
 * @return {TClient} The client instance for the query engine.
 */
export const useClient = < TClient, TClientOptions >(
	client: TClient | undefined
): TClient | undefined => {
	const engine = Registry.getEngine< TClient, TClientOptions >();
	return engine.useClient( client );
};

/**
 * Returns a server client instance for the query engine.
 *
 * @param {TClientOptions} args - Arguments to be passed to the query engine.
 *
 * @throws {Error} If no query engine is found in the config.
 *
 * @return {TClient} The server client instance for the query engine.
 */
export const getServerClient = < TClient, TClientOptions >(
	args: TClientOptions
): TClient => {
	const engine = Registry.getEngine< TClient, TClientOptions >();
	return engine.getServerClient( args );
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
export const fetchQuery = < TData, TQueryOptions >(
	args: fetchQueryArgs< TData, TQueryOptions >
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
export const useQuery = < TData, TQueryOptions >(
	args: useQueryArgs< TData, TQueryOptions >
): TData => {
	const engine = Registry.getEngine();
	return engine.useQuery( args );
};

export const QueryProvider = Registry.getEngine().QueryProvider;

export { Registry };
