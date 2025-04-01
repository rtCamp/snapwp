import {
	QueryClient,
	useQuery,
	type UseQueryOptions,
} from '@tanstack/react-query';
import type { QueryClientAdapter } from '@snapwp/types';
import { request } from 'graphql-request';
import type { DocumentNode, TypedDocumentNode } from '@apollo/client';
import { getGraphqlUrl } from '@snapwp/core/config';

/**
 * TanStack Query Adapter
 */
export class TanStackQueryClientAdapter
	implements QueryClientAdapter< QueryClient >
{
	private readonly client: QueryClient;

	/**
	 * Constructor
	 * @param options - Optional client options.
	 */
	constructor( options?: QueryClient ) {
		this.client = options || new QueryClient();
	}

	/**
	 * Returns the TanStack Query Client instance.
	 * @return The Query Client instance.
	 */
	getClient(): QueryClient {
		return this.client;
	}

	/**
	 * Returns the TanStack Query Client instance for server-side use.
	 *
	 * @return The Query Client instance.
	 */
	getServerClient(): QueryClient {
		return this.client;
	}

	/**
	 * Executes a query and returns the data.
	 *
	 * @param object Root object
	 * @param object.key - Cache key for the query.
	 * @param object.query - GraphQL query string.
	 * @param object.options - Optional query options.
	 *
	 * @return A promise that resolves with the query data.
	 */
	// @ts-ignore -- It is strictly checking generic type with guardrail type for Apollo.
	async fetchQuery< TData >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: UseQueryOptions< TData > & {
			variables?: Record< string, unknown >;
		};
	} ): Promise< TData > {
		const graphqlUrl = getGraphqlUrl();
		return this.client.fetchQuery( {
			queryKey: key,
			queryFn: makeGraphQLRequest(
				graphqlUrl,
				query,
				options?.variables
			),
			...options,
		} );
	}

	// @ts-ignore
	/**
	 * Hook to use a query in React components.
	 *
	 * @param object Root object
	 * @param object.key - Cache key for the query.
	 * @param object.query - GraphQL query string.
	 * @param object.options - Optional query options.
	 *
	 * @return The query result.
	 */
	// @ts-ignore -- It is strictly checking generic type with guardrail type for Apollo.
	useQuery< TData >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: UseQueryOptions< TData > & {
			variables?: Record< string, unknown >;
		};
	} ): ReturnType< typeof useQuery > {
		const graphqlUrl = getGraphqlUrl();
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook
		return useQuery( {
			queryKey: key,
			queryFn: makeGraphQLRequest(
				graphqlUrl,
				query,
				options?.variables
			),
			...options,
		} );
	}
}

/**
 * Function to make a GraphQL request.
 * @param url - The URL of the GraphQL endpoint.
 * @param query - The GraphQL query to execute.
 * @param variables - Optional variables for the query.
 *
 * @return A promise that resolves with the query data.
 */
const makeGraphQLRequest = < TData >(
	url: string,
	query: DocumentNode | TypedDocumentNode< TData >,
	variables: Record< string, unknown > | undefined
): ( () => Promise< TData > ) => {
	return () => {
		if ( variables ) {
			return request( {
				url,
				document: query,
				variables,
			} );
		}

		return request( {
			url,
			document: query,
		} );
	};
};
