import { getGraphqlUrl, getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGlobalMetadataDocument,
	GetGeneralSettingsDocument,
	GetGlobalStylesDocument,
	GetOpenGraphMetadataDocument,
	GetRouteMetadataDocument,
	GetTwitterMetadataDocument,
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
import parseGlobalMetadata from '@/utils/parse-global-metadata';
import parseRouteMetadata from '@/utils/parse-route-metadata';
import parseOpenGraphMetadata from '@/utils/parse-opengraph-metadata';
import parseTwitterMetadata from '@/utils/parse-twitter-metadata';
import type {
	ParsedGlobalMetadata,
	ParsedRouteMetadata,
	ParsedOpenGraphMetadata,
	ParsedTwitterMetadata,
} from '@snapwp/types';
import parseGeneralSettings from '@/utils/parse-general-settings';

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
	 * Fetches the general settings, like favicon icon.
	 *
	 * @return General settings data.
	 */
	static getGeneralSettings = async () => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}

		try {
			const data = await QueryEngine.apolloClient.query( {
				query: GetGeneralSettingsDocument,
				fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
				errorPolicy: 'all',
			} );

			return parseGeneralSettings( data );
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
	 * Fetches blocks, scripts and styles for the given uri.
	 * @param uri - The URL of the seed node.
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

	/**
	 * Fetches global site metadata, including title, description, and locale.
	 *
	 * @return Parsed global metadata.
	 */
	static getGlobalMetadata = async (): Promise< ParsedGlobalMetadata > => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}

		try {
			const { data } = await QueryEngine.apolloClient.query( {
				query: GetGlobalMetadataDocument,
				fetchPolicy: 'network-only',
				errorPolicy: 'all',
			} );

			return parseGlobalMetadata( data );
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
	};

	/**
	 * Fetches metadata for a specific route.
	 *
	 * @param uri - The URI of the route.
	 * @return Parsed route metadata.
	 */
	static getRouteMetadata = async (
		uri: string
	): Promise< ParsedRouteMetadata > => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}
		const variables = { uri };

		try {
			const { data } = await QueryEngine.apolloClient.query( {
				query: GetRouteMetadataDocument,
				variables,
				fetchPolicy: 'network-only',
				errorPolicy: 'all',
			} );

			return parseRouteMetadata( data );
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
	};

	/**
	 * Fetches Open Graph metadata for a specific route.
	 *
	 * @param uri - The URI of the route.
	 * @return Parsed Open Graph metadata.
	 */
	static getOpenGraphMetadata = async (
		uri: string
	): Promise< ParsedOpenGraphMetadata > => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}
		const variables = { uri };

		try {
			const { data } = await QueryEngine.apolloClient.query( {
				query: GetOpenGraphMetadataDocument,
				variables,
				fetchPolicy: 'network-only',
				errorPolicy: 'all',
			} );

			return parseOpenGraphMetadata( data );
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
	};

	/**
	 * Fetches Twitter metadata for a specific route.
	 *
	 * @param uri - The URI of the route.
	 * @return Parsed Twitter metadata.
	 */
	static getTwitterMetadata = async (
		uri: string
	): Promise< ParsedTwitterMetadata > => {
		if ( ! QueryEngine.isClientInitialized ) {
			QueryEngine.initialize();
		}
		const variables = { uri };

		try {
			const { data } = await QueryEngine.apolloClient.query( {
				query: GetTwitterMetadataDocument,
				variables,
				fetchPolicy: 'network-only',
				errorPolicy: 'all',
			} );

			return parseTwitterMetadata( data );
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
	};
}

/**
 * Logs the Apollo errors.
 *
 * @param error - The Apollo error.
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
