import { getGraphqlUrl, getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGlobalStylesDocument,
} from '@graphqlTypes/graphql';
import {
	ApolloClient,
	ApolloError,
	InMemoryCache,
	type NormalizedCacheObject,
	type ServerError,
	type ServerParseError,
} from '@apollo/client';
import parseTemplate from '@/utils/parse-template';
import parseGlobalStyles from '@/utils/parse-global-styles';
import { Logger, type GlobalHeadProps } from '@snapwp/core';

/**
 * Singleton class to handle GraphQL queries using Apollo.
 */
export class QueryEngine {
	private static instance: QueryEngine | null = null;
	private static graphqlEndpoint: string;
	private static homeUrl: string;
	private static apolloClient: ApolloClient< NormalizedCacheObject >;

	private static isClientInitialized = false;

	/**
	 * Initializer.
	 */
	public static initialize() {
		QueryEngine.graphqlEndpoint = getGraphqlUrl();

		const { homeUrl } = getConfig();
		QueryEngine.homeUrl = homeUrl;

		QueryEngine.apolloClient = new ApolloClient( {
			uri: QueryEngine.graphqlEndpoint,
			cache: new InMemoryCache(),
		} );
	}

	/**
	 * Returns the singleton instance of QueryEngine.
	 * @throws Throws error if instance is not initialized with config.
	 * @return The QueryEngine instance.
	 */
	public static getInstance(): QueryEngine {
		if ( ! QueryEngine.instance ) {
			QueryEngine.instance = new QueryEngine();
		}
		return QueryEngine.instance;
	}

	/**
	 * Fetches global styles.
	 * @return The template data fetched for the uri.
	 */
	static getGlobalStyles = async (): Promise< GlobalHeadProps > => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}

		try {
			const data = await QueryEngine.apolloClient.query( {
				query: GetGlobalStylesDocument,
				fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
				errorPolicy: 'all',
			} );

			return parseGlobalStyles( data );
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
	};

	/**
	 * Fetches blocks, scripts, and styles for the given uri.
	 *
	 * @param {string} uri The URL of the seed node.
	 *
	 * @return The template data fetched for the uri.
	 */
	static getTemplateData = async ( uri: string ) => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}
		const variables = { uri };

		try {
			const data = await QueryEngine.apolloClient.query( {
				query: GetCurrentTemplateDocument,
				variables,
				fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
				errorPolicy: 'all',
			} );

			return parseTemplate( data, QueryEngine.homeUrl, uri );
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
	};
}

/**
 * Logs the Apollo errors.
 *
 * @param {ApolloError} error The Apollo error.
 */
const logApolloErrors = ( error: ApolloError ) => {
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
 * @param {Error|ServerParseError|ServerError} networkError The network error.
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
			errorMessage = serverError.result.message;
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
