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
import { TanStackQueryProvider } from '@/query-provider';
import type { QueryClientAdapter } from '@snapwp/types';
import type { DocumentNode } from 'graphql';

/**
 * TanStack Query Client Adapter that implements the QueryClientAdapter interface.
 * This adapter allows you to work with TanStack Query in a generic way.
 */
export class TanStackQueryClientAdapter
	implements QueryClientAdapter< QueryClient, QueryClientConfig >
{
	private static instance?: TanStackQueryClientAdapter;
	private client?: QueryClient;
	private readonly clientOptions: QueryClientConfig;

	/**
	 * Singleton instance of the TanStackQueryClientAdapter.
	 * @param {QueryClientConfig} options Optional TanStackClientOptions to configure the client instance.
	 *
	 * @return The singleton instance of the TanStackQueryClientAdapter.
	 */
	static getInstance(
		options?: QueryClientConfig
	): TanStackQueryClientAdapter {
		if ( ! TanStackQueryClientAdapter.instance ) {
			TanStackQueryClientAdapter.instance =
				new TanStackQueryClientAdapter( options );
		}
		return TanStackQueryClientAdapter.instance;
	}

	/**
	 * Creates a new instance of TanStackQueryClientAdapter.
	 * @param {QueryClientConfig} options - Optional QueryClient instance. If not provided, a new QueryClient is created.
	 */
	constructor( options?: QueryClientConfig ) {
		options = options || ( {} as QueryClientConfig );

		this.clientOptions = options;
	}

	/**
	 * Initializes a new TanStackClient instance with default options and merges them with provided options.
	 *
	 * @param {QueryClientConfig} options Optional TanStackClientOptions to merge with the default configuration.
	 *
	 * @return A new instance of TanStackClient with the merged configuration.
	 */
	init( options?: QueryClientConfig ): QueryClient {
		return new QueryClient( options );
	}

	/**
	 * Returns the TanStack QueryClient instance.
	 * @param {QueryClientConfig} options - Generic client options (not used in this implementation).
	 * @return The QueryClient instance.
	 */
	// @ts-ignore
	getClient( options?: QueryClientConfig ): QueryClient {
		return this.init( options );
	}

	/**
	 * Returns the TanStack QueryClient instance for server-side usage.
	 *
	 * @return The QueryClient instance.
	 */
	getServerClient(): QueryClient {
		if ( ! this.client ) {
			this.client = this.init( this.clientOptions );
		}

		return this.client;
	}

	/**
	 * Returns the provided QueryClient instance or undefined.
	 * This method is useful when an optional client needs to be used.
	 * @param {QueryClient | undefined} client - A QueryClient instance or undefined.
	 * @return The provided QueryClient instance or undefined.
	 */
	useClient( client?: QueryClient ): ReturnType< typeof useQueryClient > {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		return useQueryClient( client );
	}

	/**
	 * Executes a GraphQL query using the Tanstack Client instance and writes the result to the cache.
	 * @param {Object} param0 An object containing:
	 * @param {string[]} param0.key - An array of strings that uniquely identifies the query in the cache.
	 * @param {DocumentNode} param0.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param {TQueryOptions} param0.options - Optional query options compatible with TanStack's QueryOptions.
	 * @return A promise that resolves with the query data of type TData.
	 */
	async fetchQuery<
		TData,
		TQueryOptions extends FetchQueryOptions & {
			variables?: Record< string, unknown >;
		} = FetchQueryOptions & {
			variables?: Record< string, unknown >;
		},
	>( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode;
		options?: TQueryOptions;
	} ): Promise< TData > {
		const graphqlUrl = getGraphqlUrl();
		// Here we assume that options may include variables.
		return this.getServerClient().fetchQuery( {
			queryKey: key,
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
	 * Executes a GraphQL query as a React hook using Tanstack's useQuery.
	 * @param {Object} param0 An object containing:
	 * @param {string[]} param0.key - An array of strings that uniquely identifies the query in the cache.
	 * @param {DocumentNode} param0.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param {TQueryOptions} param0.options - Optional query options compatible with TanStack's QueryHookOptions.
	 * @return The query result data of type TData.
	 */
	useQuery<
		TData,
		TQueryOptions extends FetchQueryOptions & {
			variables?: Record< string, unknown >;
		} = FetchQueryOptions & {
			variables?: Record< string, unknown >;
		},
	>( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode;
		options?: TQueryOptions;
	} ): TData {
		const graphqlUrl = getGraphqlUrl();
		// Use TanStack's useQuery hook and extract the data property.
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		const result = useQuery< TData, unknown >( {
			queryKey: key,
			/**
			 * The query function that will be called to fetch the data.
			 *
			 * @return The result of the GraphQL request.
			 */
			queryFn: () =>
				request< TData >( graphqlUrl, query, options?.variables ),
			...( options as object ),
		} as UseQueryOptions< TData, unknown > );
		return result.data as TData;
	}

	QueryProvider = TanStackQueryProvider;
}
