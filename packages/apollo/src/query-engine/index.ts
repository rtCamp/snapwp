import {
	ApolloClient,
	InMemoryCache,
	type NormalizedCacheObject,
	type DocumentNode,
	type ApolloClientOptions,
	useApolloClient,
	type QueryOptions,
	useQuery,
	type QueryHookOptions,
	type TypedDocumentNode,
	type OperationVariables,
} from '@apollo/client';
import type { QueryClientAdapter } from '@snapwp/types';
import { getGraphqlUrl } from '@snapwp/core/config';

/**
 *
 */
export class ApolloQueryClientAdapter
	implements QueryClientAdapter< ApolloClient< NormalizedCacheObject > >
{
	private readonly client: ApolloClient< NormalizedCacheObject >;

	/**
	 * Constructor
	 * @param options - Optional client options.
	 */
	constructor( options?: ApolloClientOptions< NormalizedCacheObject > ) {
		const defaultOptions: ApolloClientOptions< NormalizedCacheObject > = {
			cache: new InMemoryCache(),
			uri: getGraphqlUrl(),
		};

		options =
			options || ( {} as ApolloClientOptions< NormalizedCacheObject > );

		this.client = new ApolloClient( { ...defaultOptions, ...options } );
	}

	/**
	 * Returns the Apollo Client instance.
	 * @param [options] - Optional client options.
	 *
	 * @return The Apollo Client instance.
	 */
	// @ts-ignore -- It is strictly checking generic type with guardrail type for Apollo.
	getClient(
		options?: ApolloClientOptions< NormalizedCacheObject >
	): ApolloClient< NormalizedCacheObject > {
		const defaultOptions: ApolloClientOptions< NormalizedCacheObject > = {
			cache: new InMemoryCache(),
			uri: getGraphqlUrl(),
		};

		options =
			options || ( {} as ApolloClientOptions< NormalizedCacheObject > );

		return new ApolloClient( { ...defaultOptions, ...options } );
	}

	/**
	 * Returns the Apollo Client instance for server-side use.
	 *
	 * @return The Apollo Client instance.
	 */
	getServerClient(): ApolloClient< NormalizedCacheObject > {
		return this.client;
	}

	/**
	 * Returns the Apollo Client instance for client-side use.
	 *
	 * @param client - The Apollo Client instance.
	 * @return The Apollo Client instance or undefined.
	 */
	useClient(
		client?: ApolloClient< NormalizedCacheObject >
	): ApolloClient< NormalizedCacheObject > {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook
		return useApolloClient(
			client as ApolloClient< object >
		) as ApolloClient< NormalizedCacheObject >;
	}

	/**
	 * Executes a GraphQL query and returns the da
	 * @param object Root object
	 * @param object.key - Cache key for the query.
	 * @param object.query - GraphQL query string.
	 * @param object.options - Optional query options.
	 * @return A promise that resolves with the query data.
	 */
	// @ts-ignore -- It is strictly checking generic type with guardrail type for Apollo.
	async fetchQuery< TData, TQueryOptions extends QueryOptions >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: TQueryOptions;
	} ): Promise< TData > {
		const { data } = await this.client.query< TData >( {
			query,
			...options,
		} );

		this.client.writeQuery< TData >( {
			query,
			// @ts-ignore
			data,
			id: key.join( ':' ),
			variables: options?.variables,
		} );

		return data;
	}

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
	useQuery< TData = ReturnType< typeof useQuery > >( {
		// @ts-ignore -- We have to ignore this in apollo as it is required in tanstack.
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: OperationVariables;
	} ): TData {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook
		return useQuery< TData, OperationVariables >( query, {
			...options,
		} as QueryHookOptions< TData > ) as TData;
	}
}
