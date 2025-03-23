import { QueryEngineBase } from '@snapwp/core';
import {
	ApolloClient,
	type ApolloClientOptions,
	type DocumentNode,
	InMemoryCache,
	type NormalizedCacheObject,
	useApolloClient,
} from '@apollo/client';
import { getGraphqlUrl } from '@snapwp/core/config';

/**
 *
 */
export class ApolloQueryEngine extends QueryEngineBase<
	ApolloClient< NormalizedCacheObject >,
	ApolloClientOptions< NormalizedCacheObject >
> {
	/**
	 * Constructor
	 *
	 * @param config configuration
	 */
	// eslint-disable-next-line no-useless-constructor -- This is a constructor of child class
	constructor(
		config: ApolloClientOptions< NormalizedCacheObject > = {
			uri: getGraphqlUrl(),
			cache: new InMemoryCache(),
		}
	) {
		super( config );
	}

	/**
	 * Create a new client
	 *
	 * @param config configuration
	 *
	 * @return The client
	 */
	override createClient(
		config: ApolloClientOptions< NormalizedCacheObject >
	): ApolloClient< NormalizedCacheObject > {
		return new ApolloClient( config );
	}

	/**
	 * Get the client
	 *
	 * @return The client
	 */
	override getClient(): ApolloClient< NormalizedCacheObject > {
		return this.client;
	}

	/**
	 * Use the client
	 *
	 * @param client Optional client
	 *
	 * @return The client
	 */
	useClient( client?: ApolloClient< NormalizedCacheObject > ) {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook
		return useApolloClient( client );
	}

	/**
	 *
	 * @param _key
	 * @param _key.key
	 * @param query
	 * @param _key.query
	 * @param _key.variables
	 */
	fetchQuery( {
		query,
		variables,
	}: {
		key: string[];
		query: DocumentNode;
		variables?: Record< string, unknown >;
	} ): Promise< unknown > {
		if ( variables ) {
			return this.client.query( {
				query,
				variables,
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			} );
		}

		return this.client.query( {
			query,
			fetchPolicy: 'cache-first',
			errorPolicy: 'all',
		} );
	}
}
