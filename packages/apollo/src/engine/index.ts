import {
	ApolloClient,
	ApolloError,
	InMemoryCache,
	useApolloClient,
	useQuery as useApolloQuery,
	type ApolloClientOptions,
	type DocumentNode,
	type NormalizedCacheObject,
	type OperationVariables,
	type QueryHookOptions,
	type QueryOptions,
	type ServerError,
	type ServerParseError,
	type TypedDocumentNode,
} from '@apollo/client';
import { Logger } from '@snapwp/core';
import { getGraphqlUrl } from '@snapwp/core/config';
import { ApolloQueryProvider } from './query-provider';
import type { BaseQueryClientEngine } from '@snapwp/types';

export type clientType = ApolloClient< NormalizedCacheObject >;
export type clientOptionsType = ApolloClientOptions< NormalizedCacheObject >;

/**
 * An adapter for Apollo Client that implements the BaseQueryClientEngine interface.
 * This adapter provides methods for obtaining an Apollo Client instance, executing queries,
 * and using queries as hooks.
 */
export class ApolloQueryClientEngine
	implements BaseQueryClientEngine< clientType, clientOptionsType >
{
	private client?: ApolloClient< NormalizedCacheObject >;
	private readonly clientOptions: ApolloClientOptions< NormalizedCacheObject >;

	/**
	 * Creates a new instance of ApolloQueryClientEngine.
	 * @param { ApolloClientOptions< NormalizedCacheObject > } options Optional ApolloClientOptions to configure the client instance.
	 */
	constructor( options?: ApolloClientOptions< NormalizedCacheObject > ) {
		options =
			options || ( {} as ApolloClientOptions< NormalizedCacheObject > );

		this.clientOptions = options;
	}

	/**
	 * Initializes a new ApolloClient instance with default options and merges them with provided options.
	 *
	 * @param { ApolloClientOptions< NormalizedCacheObject > } options Optional ApolloClientOptions to merge with the default configuration.
	 *
	 * @return A new instance of ApolloClient with the merged configuration.
	 */
	init(
		options?: ApolloClientOptions< NormalizedCacheObject >
	): ApolloClient< NormalizedCacheObject > {
		const defaultOptions: ApolloClientOptions< NormalizedCacheObject > = {
			cache: new InMemoryCache(),
			uri: getGraphqlUrl(),
		};
		const mergedOptions = {
			...defaultOptions,
			...( ( options as Partial<
				ApolloClientOptions< NormalizedCacheObject >
			> ) || {} ),
		};

		return new ApolloClient( mergedOptions );
	}

	/**
	 * Returns a new ApolloClient instance using merged default and provided options.
	 * @param { ApolloClientOptions< NormalizedCacheObject > } options Optional client options to merge with the default configuration.
	 * @return A new instance of ApolloClient with the merged configuration.
	 */
	getClient(
		options?: ApolloClientOptions< NormalizedCacheObject >
	): ApolloClient< NormalizedCacheObject > {
		return this.init( options );
	}

	/**
	 * Returns the ApolloClient instance used on the server.
	 *
	 * @return The ApolloClient instance created during initialization.
	 */
	getServerClient(): ApolloClient< NormalizedCacheObject > {
		if ( ! this.client ) {
			this.client = this.init( this.clientOptions );
		}
		return this.client;
	}

	/**
	 * Returns an ApolloClient instance from a provided client or undefined.
	 * This method is useful when you need to use the ApolloClient hook.
	 * @param { ApolloClient< NormalizedCacheObject > } client An optional ApolloClient instance.
	 * @return The ApolloClient instance if provided; otherwise, undefined.
	 */
	useClient(
		client: ApolloClient< NormalizedCacheObject > | undefined
	): ApolloClient< NormalizedCacheObject > | undefined {
		return client
			? // eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
			  ( useApolloClient(
					client as ApolloClient< object >
			  ) as ApolloClient< NormalizedCacheObject > )
			: undefined;
	}

	/**
	 * Executes a GraphQL query using the Apollo Client instance and writes the result to the cache.
	 * @param { Object } props An object containing:
	 * @param { string[] } props.key - An array of strings that uniquely identifies the query in the cache.
	 * @param { DocumentNode | TypedDocumentNode< TData > } props.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param { TQueryOptions } props.options - Optional query options compatible with Apollo's QueryOptions.
	 * @return A promise that resolves with the query data of type TData.
	 * @throws An error if the query fails, with enhanced error logging for ApolloErrors.
	 */
	async fetchQuery<
		TData,
		TQueryOptions extends QueryOptions = QueryOptions,
	>( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: TQueryOptions;
	} ): Promise< TData > {
		try {
			const queryResult = await this.getServerClient().query< TData >( {
				...( options as QueryOptions ),
				query,
			} );

			if ( queryResult.errors?.length ) {
				queryResult.errors?.forEach( ( error ) => {
					Logger.error(
						`Error fetching ${ key.join( ':' ) }: ${ error }`
					);
				} );
			}

			return queryResult.data;
		} catch ( error ) {
			if ( error instanceof ApolloError ) {
				logApolloErrors( error );

				if ( error.networkError ) {
					throw new Error(
						getNetworkErrorMessage( error.networkError )
					);
				}
			}
			throw error;
		}
	}

	/**
	 * Executes a GraphQL query as a React hook using Apollo's useQuery.
	 * @param { Object } props An object containing:
	 * @param { string[] } props.key - An array of strings that uniquely identifies the query in the cache.
	 * @param { DocumentNode | TypedDocumentNode< TData > } props.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
	 * @param { TQueryOptions } props.options - Optional query options compatible with Apollo's QueryHookOptions.
	 * @return The query result data of type TData.
	 */
	useQuery<
		TData,
		TQueryOptions extends QueryHookOptions = QueryHookOptions,
	>( {
		// @ts-ignore
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: TQueryOptions;
	} ): TData {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		return useApolloQuery< TData, OperationVariables >(
			query,
			options as QueryHookOptions< TData, OperationVariables >
		).data as TData;
	}
	QueryProvider = ApolloQueryProvider;
}

/**
 * Logs Apollo errors by outputting error messages for GraphQL, client, and protocol errors.
 * @param {ApolloError} error The ApolloError object containing error details.
 */
const logApolloErrors = ( error: ApolloError ): void => {
	error.graphQLErrors.forEach( ( graphQLError ) => {
		Logger.error( graphQLError.message );
	} );
	error.clientErrors.forEach( ( clientError ) => {
		Logger.error( clientError.message );
	} );
	error.protocolErrors.forEach( ( protocolError ) => {
		Logger.error( protocolError.message );
	} );
};

/**
 * Constructs a user-friendly network error message based on the type of network error.
 * @param {Error | ServerParseError | ServerError} networkError The network error, which may be a generic Error, ServerParseError, or ServerError.
 * @return A formatted string with the error message and status code.
 */
const getNetworkErrorMessage = (
	networkError: Error | ServerParseError | ServerError
): string => {
	let statusCode: number | undefined;
	let errorMessage: string | undefined;

	if ( networkError.name === 'ServerError' ) {
		const serverError = networkError as ServerError;
		statusCode = serverError.statusCode;
		if ( typeof serverError.result === 'string' ) {
			errorMessage = serverError.result;
		} else {
			errorMessage = serverError.result[ 'message' ];
		}
	} else if ( networkError.name === 'ServerParseError' ) {
		const serverParseError = networkError as ServerParseError;
		statusCode = serverParseError.statusCode;
		errorMessage = serverParseError.message;
	} else {
		errorMessage = networkError.message;
	}

	return `Network error ${ errorMessage } (Status: ${ statusCode })`;
};
