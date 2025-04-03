import {
	type FetchQueryOptions,
	QueryClient,
	type QueryClientConfig,
	useQuery,
	type UseQueryOptions,
} from '@tanstack/react-query';
import type { QueryClientAdapter } from '@snapwp/types';
import { request } from 'graphql-request';
import type { DocumentNode } from 'graphql';
import { getGraphqlUrl } from '@snapwp/core/config';
import { TanStackQueryProvider } from '@/query-provider';

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
	 * @param options Optional TanStackClientOptions to configure the client instance.
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
	 * @param options - Optional QueryClient instance. If not provided, a new QueryClient is created.
	 */
	constructor( options?: QueryClientConfig ) {
		options = options || ( {} as QueryClientConfig );

		this.clientOptions = options;
	}

	/**
	 * Initializes a new TanStackClient instance with default options and merges them with provided options.
	 *
	 * @param options Optional TanStackClientOptions to merge with the default configuration.
	 *
	 * @return A new instance of TanStackClient with the merged configuration.
	 */
	init( options?: QueryClientConfig ): QueryClient {
		return new QueryClient( options );
	}

	/**
	 * Returns the TanStack QueryClient instance.
	 * @param options - Generic client options (not used in this implementation).
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
	 * @param client - A QueryClient instance or undefined.
	 * @return The provided QueryClient instance or undefined.
	 */
	useClient( client: QueryClient | undefined ): QueryClient | undefined {
		return client;
	}

	/**
	 * Executes a GraphQL query using the Tanstack Client instance and writes the result to the cache.
	 * @param param0 An object containing:
	 * @param param0.key - An array of strings that uniquely identifies the query in the cache.
	 * @param param0.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param param0.options - Optional query options compatible with TanStack's QueryOptions.
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
			queryFn: makeGraphQLRequest< TData >(
				graphqlUrl,
				query,
				options?.variables
			),
			...( options as object ),
		} );
	}

	/**
	 * Executes a GraphQL query as a React hook using Tanstack's useQuery.
	 * @param param0 An object containing:
	 * @param param0.key - An array of strings that uniquely identifies the query in the cache.
	 * @param param0.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param param0.options - Optional query options compatible with TanStack's QueryHookOptions.
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
			queryFn: makeGraphQLRequest< TData >(
				graphqlUrl,
				query,
				options?.variables
			),
			...( options as object ),
		} as UseQueryOptions< TData, unknown > );
		return result.data as TData;
	}

	QueryProvider = TanStackQueryProvider;
}

/**
 * Constructs a function to make a GraphQL request using graphql-request.
 * @param url - The URL of the GraphQL endpoint.
 * @param query - The GraphQL query to execute.
 * @param variables - Optional variables for the query.
 * @return A function that, when called, returns a promise resolving with the query data.
 */
const makeGraphQLRequest = < TData >(
	url: string,
	query: DocumentNode,
	variables: Record< string, unknown > | undefined
): ( () => Promise< TData > ) => {
	return () => {
		// graphql-request's request function accepts (url, query, variables)
		return request( url, query, variables );
	};
};
