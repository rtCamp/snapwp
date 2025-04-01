import {
	GetCurrentTemplateDocument,
	GetGeneralSettingsDocument,
	GetGlobalStylesDocument,
} from '@graphqlTypes/graphql';
import {
	ApolloError,
	type ServerError,
	type ServerParseError,
} from '@apollo/client';
import parseTemplate from '@/utils/parse-template';
import parseGlobalStyles from '@/utils/parse-global-styles';
import { Logger, type GlobalHeadProps } from '@snapwp/core';
import parseGeneralSettings from '@/utils/parse-general-settings';
import { getConfig } from '@snapwp/core/config';
import { QueryAdapterRegistry } from '@/query-adapter-registry';

/**
 * Singleton class to handle GraphQL queries using Apollo.
 */
export class QueryEngine {
	private static instance: QueryEngine | null = null;

	/**
	 * Private constructor to prevent instantiation.
	 */
	// eslint-disable-next-line no-useless-constructor,no-empty-function -- Constructor is private to prevent instantiation.
	private constructor() {}

	/**
	 * Returns the singleton instance of QueryEngine.
	 *
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
	getGlobalStyles = async (): Promise< GlobalHeadProps > => {
		try {
			const data = await QueryAdapterRegistry.adapter.fetchQuery( {
				key: [ 'globalStyles' ],
				query: GetGlobalStylesDocument,
			} );

			// @ts-ignore
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
	getGeneralSettings = async () => {
		try {
			const data = await QueryAdapterRegistry.adapter.fetchQuery( {
				key: [ 'generalSettings' ],
				query: GetGeneralSettingsDocument,
			} );

			// @ts-ignore
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
	getTemplateData = async ( uri: string ) => {
		const variables = { uri };

		try {
			const data = await QueryAdapterRegistry.adapter.fetchQuery( {
				key: [ 'templateData', uri ],
				query: GetCurrentTemplateDocument,
				options: {
					variables,
				},
			} );

			const { homeUrl } = getConfig();
			// @ts-ignore
			return parseTemplate( data, homeUrl, uri );
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
