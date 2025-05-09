import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { ComponentType, PropsWithChildren } from 'react';

/**
 * A generic interface for creating adapters to support different GraphQL clients
 * both on the server and client side.
 *
 * @template TClient - The type of the GraphQL client instance.
 * @template TClientOptions - The type of options used to initialize the client.
 */
export interface QueryEngine< TClient > {
	/**
	 * Retrieve a query client suitable for server-side usage.
	 *
	 * @return The server-side query client instance.
	 */
	getClient: () => TClient;

	/**
	 * Set or retrieve the client instance on the client side.
	 *
	 * @param client - The query client instance or undefined.
	 * @return The query client instance or undefined.
	 */
	useClient: ( client: TClient | undefined ) => TClient;

	/**
	 * Perform a server-safe data fetch using the GraphQL client.
	 *
	 * @param { Object } args - Object containing:
	 *   - key: Unique cache key for the query.
	 *   - query: The GraphQL document (typed or untyped).
	 *   - options: Client-specific query options (kept unknown to allow flexibility; implementers can define stricter types).
	 * @return A promise resolving with the queried data.
	 */
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- @todo fix this and the downstream types.
	fetchQuery< TData, TQueryVars extends Record< string, unknown > >(
		args: QueryArgs< TData, TQueryVars >
	): Promise< TData >;

	/**
	 * React hook for client-side GraphQL queries.
	 *
	 * @param { Object } args - Object containing:
	 *   - key: Unique cache key for the query.
	 *   - query: The GraphQL document (typed or untyped).
	 *   - options: Client-specific query options (kept unknown to allow flexibility; implementers can define stricter types).
	 * @return The queried data.
	 */
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- @todo fix this and the downstream types.
	useQuery< TData, TQueryVars extends Record< string, unknown > >(
		args: QueryArgs< TData, TQueryVars >
	): TData;

	/**
	 * React component that provides the query client context.
	 */
	QueryProvider: ComponentType< PropsWithChildren< { client: TClient } > >;
}

export interface QueryOptions< TQueryVars extends Record< string, unknown > > {
	variables?: TQueryVars;
}

export interface QueryArgs<
	TData,
	TQueryVars extends Record< string, unknown >,
> {
	name: string;
	query: TypedDocumentNode< TData, TQueryVars >;
	options?: QueryOptions< TQueryVars >;
}
