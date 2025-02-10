import { getGraphqlUrl, getConfig } from '@snapwp/core/config';
import { GlobalHeadProps } from '@snapwp/core';
import {
	GetCurrentTemplateDocument,
	GetGlobalStylesDocument,
} from '@graphqlTypes/graphql';
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import parseTemplate from '@/utils/parse-template';
import parseGlobalStyles from '@/utils/parse-global-styles';

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

		const data = await QueryEngine.apolloClient.query( {
			query: GetGlobalStylesDocument,
			fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
			errorPolicy: 'all',
		} );

		return parseGlobalStyles( data );
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

		const data = await QueryEngine.apolloClient.query( {
			query: GetCurrentTemplateDocument,
			variables,
			fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
			errorPolicy: 'all',
		} );

		return parseTemplate( data, QueryEngine.homeUrl, uri );
	};
}
