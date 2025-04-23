import {
	QueryClient,
	useQuery,
	useQueryClient,
	type FetchQueryOptions,
	type QueryClientConfig,
	type UseQueryOptions,
} from '@tanstack/react-query';
import { request } from 'graphql-request';
import { getGraphqlUrl } from '@snapwp/core/config';
import { QueryProvider } from './query-provider';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { QueryEngine, QueryOptions } from '@snapwp/types';

export type clientType = QueryClient;
export type clientOptionsType = QueryClientConfig;

type TanStackQueryArgs<
	TData,
	TQueryVars extends Record< string, unknown >,
> = {
	name: string;
	query: TypedDocumentNode< TData, TQueryVars >;
	options?: Omit<
		FetchQueryOptions< TData > & QueryOptions< TQueryVars >,
		'queryKey'
	>;
};
/**
 * TanStack Query Client Adapter that implements the QueryEngine interface.
 * This adapter allows you to work with TanStack Query in a generic way.
 */
export class TanStackQueryEngine implements QueryEngine< QueryClient > {
	private readonly client: QueryClient;

	/**
	 *
	 * @param { QueryClientConfig } options - Client options.
	 */
	constructor( options?: QueryClientConfig ) {
		this.client = new QueryClient( options );
	}

	/**
	 * Returns the TanStack QueryClient instance for server-side usage.
	 *
	 * @return The QueryClient instance.
	 */
	getClient(): QueryClient {
		return this.client;
	}

	/**
	 * Returns the provided QueryClient instance or undefined.
	 * This method is useful when an optional client needs to be used.
	 * @param { QueryClient | undefined } client - A QueryClient instance or undefined.
	 * @return The provided QueryClient instance or undefined.
	 */
	useClient( client?: QueryClient ): ReturnType< typeof useQueryClient > {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		return useQueryClient( client );
	}

	/**
	 * Executes a GraphQL query using the TanStack Client instance and writes the result to the cache.
	 * @param { Object } props An object containing:
	 * @param { string[] } props.name - An array of strings that uniquely identifies the query in the cache.
	 * @param { DocumentNode } props.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param { TQueryOptions } props.options - Optional query options compatible with TanStack's QueryOptions.
	 * @return A promise that resolves with the query data of type TData.
	 */
	async fetchQuery< TData, TQueryVars extends Record< string, unknown > >( {
		name,
		query,
		options,
	}: TanStackQueryArgs< TData, TQueryVars > ): Promise< TData > {
		const graphqlUrl = getGraphqlUrl();

		// Here we assume that options may include variables.
		return this.getClient().fetchQuery( {
			queryKey: parseKeyArray( name, options?.variables ),
			/**
			 * The query function that will be called to fetch the data.
			 *
			 * @return The result of the GraphQL request.
			 */
			queryFn: () =>
				request< TData >( graphqlUrl, query, options?.variables ),
			...( options as object ),
		} );
	}

	/**
	 * Executes a GraphQL query as a React hook using TanStack's useQuery.
	 * @param { Object } props An object containing:
	 * @param { string[] } props.key - An array of strings that uniquely identifies the query in the cache.
	 * @param { DocumentNode } props.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param { TQueryOptions } props.options - Optional query options compatible with TanStack's QueryHookOptions.
	 * @return The query result data of type TData.
	 */
	useQuery< TData, TQueryVars extends Record< string, unknown > >( {
		name,
		query,
		options,
	}: TanStackQueryArgs< TData, TQueryVars > ): TData {
		const graphqlUrl = getGraphqlUrl();

		// Use TanStack's useQuery hook and extract the data property.
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		const result = useQuery< TData, unknown >( {
			queryKey: parseKeyArray( name, options?.variables ),
			/**
			 * The query function that will be called to fetch the data.
			 *
			 * @return The result of the GraphQL request.
			 */
			queryFn: () =>
				request< TData >( graphqlUrl, query, options?.variables ),
			...options,
		} as UseQueryOptions< TData, unknown > );
		return result.data as TData;
	}

	QueryProvider = QueryProvider;
}

/**
 *
 * @param {string} name Query name.
 * @param {Record< string, unknown >} variables Query Variables
 *
 * @return key array for tanstack
 */
function parseKeyArray(
	name: string,
	variables?: Record< string, unknown >
): string[] {
	const key = [ name ];

	if ( variables ) {
		// If options include variables, we need to create a unique key.
		Object.values( variables ).forEach( ( value ) => {
			if ( Array.isArray( value ) ) {
				key.push( value.join( ':' ) );
			} else if ( typeof value === 'number' ) {
				// Convert number to string
				key.push( value.toString() );
			} else if ( typeof value === 'bigint' ) {
				// Convert BigInt to string
				key.push( value.toString() );
			} else if ( typeof value === 'string' ) {
				key.push( value );
			} else {
				// Handle other types as needed
				key.push( JSON.stringify( value ) );
			}
		} );
	}

	return key;
}
