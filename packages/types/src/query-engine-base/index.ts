import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { DocumentNode } from 'graphql/language';
import type { ComponentType, PropsWithChildren } from 'react';

/**
 * A generic interface for creating adapters to support different GraphQL clients
 * both on the server and client side.
 *
 * @template TClient - The type of the GraphQL client instance.
 * @template TClientOptions - The type of options used to initialize the client.
 */
export interface QueryEngine< TClient = unknown, TClientOptions = unknown > {
	/**
	 * Initialize a new query client instance.
	 *
	 * @param options - Optional configuration for the client.
	 * @return The initialized query client.
	 */
	init( options?: TClientOptions ): TClient;

	/**
	 * Retrieve the query client (can be singleton or factory).
	 *
	 * @param options - Optional configuration for the client.
	 * @return The query client instance.
	 */
	getClient( options?: TClientOptions ): TClient;

	/**
	 * Retrieve a query client suitable for server-side usage.
	 *
	 * @param options - Optional configuration for the client.
	 * @return The server-side query client instance.
	 */
	getServerClient( options?: TClientOptions ): TClient;

	/**
	 * Set or retrieve the client instance on the client side.
	 *
	 * @param client - The query client instance or undefined.
	 * @return The query client instance or undefined.
	 */
	useClient( client: TClient | undefined ): TClient | undefined;

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
	fetchQuery< TData, TQueryOptions extends unknown | undefined >(
		args: fetchQueryArgs< TData, TQueryOptions >
	): Promise< TData >;

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
	useQuery< TData, TQueryOptions extends unknown | undefined >(
		args: useQueryArgs< TData, TQueryOptions >
	): TData;

	/**
	 * React component that provides the query client context.
	 */
	QueryProvider: ComponentType< PropsWithChildren< { client: TClient } > >;
}

export type fetchQueryArgs<
	TData,
	TQueryOptions extends unknown | undefined,
> = {
	name: string;
	query: DocumentNode | TypedDocumentNode< TData >;
	options?: TQueryOptions; // Intentionally kept unknown for implementer-defined types.
};

export type useQueryArgs<
	TData,
	TQueryOptions extends unknown | undefined,
> = fetchQueryArgs< TData, TQueryOptions >;
