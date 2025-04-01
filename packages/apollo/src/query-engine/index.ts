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
	ApolloError,
	type ServerError,
	type ServerParseError,
} from '@apollo/client';
import type { QueryClientAdapter } from '@snapwp/types';
import { getGraphqlUrl } from '@snapwp/core/config';
import { Logger } from '@snapwp/core';

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
		try {
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
		} catch ( error ) {
			if ( error instanceof ApolloError ) {
				logApolloErrors( error );

				// If there are networkError throw the error with proper message.
				if ( error.networkError ) {
					// Throw the error with proper message.
					throw new Error(
						getNetworkErrorMessage( error.networkError )
					);
				}
			}

			// If error is not an instance of ApolloError, throw the error again.
			throw error;
		}
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

/**
 * Logs the Apollo errors.
 *
 * @param error - The Apollo error.
 */
const logApolloErrors = ( error: ApolloError ): void => {
	// If there are graphQLErrors log them.
	error.graphQLErrors.forEach( ( graphQLError ) => {
		Logger.error( graphQLError.message );
	} );

	// If there are clientErrors log them.
	error.clientErrors.forEach( ( clientError ) => {
		Logger.error( clientError.message );
	} );

	// If there are protocolErrors log them.
	error.protocolErrors.forEach( ( protocolError ) => {
		Logger.error( protocolError.message );
	} );
};

/**
 * Returns the network error message.
 *
 * @param networkError - The network error.
 *
 * @return The network error message.
 */
const getNetworkErrorMessage = (
	networkError: Error | ServerParseError | ServerError
): string => {
	let statusCode: number | undefined;
	let errorMessage: string | undefined;
	// If networkError is ServerError, get the status code and message.
	if ( networkError.name === 'ServerError' ) {
		const serverError = networkError as ServerError;
		statusCode = serverError.statusCode;
		if ( typeof serverError.result === 'string' ) {
			errorMessage = serverError.result;
		} else {
			errorMessage = serverError.result[ 'message' ];
		}
	} else if (
		// If networkError is ServerParseError, get the status code and message.
		networkError.name === 'ServerParseError'
	) {
		const serverParseError = networkError as ServerParseError;

		statusCode = serverParseError.statusCode;
		errorMessage = serverParseError.message;
	} else {
		// If networkError is not ServerError or ServerParseError, get the message.
		errorMessage = networkError.message;
	}

	return `Network error ${ errorMessage } (Status: ${ statusCode })`;
};
