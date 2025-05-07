import {
	ApolloClient,
	ApolloError,
	InMemoryCache,
	useApolloClient,
	useQuery as useApolloQuery,
	type ApolloClientOptions,
	type NormalizedCacheObject,
	type OperationVariables,
	type QueryOptions,
	type ServerError,
	type ServerParseError,
} from '@apollo/client';
import { Logger } from '@snapwp/core';
import { getGraphqlUrl } from '@snapwp/core/config';
import { QueryProvider } from './query-provider';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { QueryEngine } from '@snapwp/types';

export type clientType = ApolloClient< NormalizedCacheObject >;
export type clientOptionsType = ApolloClientOptions< NormalizedCacheObject >;

type ApolloQueryArgs< TData, TQueryVars extends Record< string, unknown > > = {
	name: string;
	query: TypedDocumentNode< TData, TQueryVars >;
	options?: QueryOptions< TQueryVars, TData >;
};

/**
 * An adapter for Apollo Client that implements the QueryEngine interface.
 * This adapter provides methods for obtaining an Apollo Client instance, executing queries,
 * and using queries as hooks.
 */
export class ApolloClientEngine implements QueryEngine< clientType > {
	private readonly client: ApolloClient< NormalizedCacheObject >;

	/**
	 * Creates a new instance of ApolloClientEngine.
	 * @param { ApolloClientOptions< NormalizedCacheObject > } options Optional ApolloClientOptions to configure the client instance.
	 */
	constructor( options?: ApolloClientOptions< NormalizedCacheObject > ) {
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

		this.client = new ApolloClient( mergedOptions );
	}

	/**
	 * Returns ApolloClient instance.
	 *
	 * @return A instance of ApolloClient.
	 */
	getClient(): ApolloClient< NormalizedCacheObject > {
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
	): ApolloClient< NormalizedCacheObject > {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		return useApolloClient(
			client || this.client
		) as ApolloClient< NormalizedCacheObject >;
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
		TQueryOptions extends Record< string, unknown >,
	>( {
		name,
		query,
		options,
	}: ApolloQueryArgs< TData, TQueryOptions > ): Promise< TData > {
		try {
			const queryResult = await this.getClient().query< TData >( {
				...options,
				query,
				// @todo: make this customizable. See https://github.com/rtCamp/headless/issues/461
				fetchPolicy: 'no-cache',
			} );

			if ( queryResult.errors?.length ) {
				queryResult.errors?.forEach( ( error ) => {
					Logger.error( `Error fetching ${ name }: ${ error }` );
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
	useQuery< TData, TQueryOptions extends Record< string, unknown > >( {
		query,
		options,
	}: ApolloQueryArgs< TData, TQueryOptions > ): TData {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
		return useApolloQuery< TData, OperationVariables >( query, options )
			.data as TData;
	}
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
