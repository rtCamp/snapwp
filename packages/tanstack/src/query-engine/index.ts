import { QueryEngineBase } from '@snapwp/core';
import {
	useQueryClient,
	QueryClient,
	type QueryClientConfig,
} from '@tanstack/react-query';
import { request } from 'graphql-request';
import type { DocumentNode } from 'graphql/language';
import { getGraphqlUrl } from '@snapwp/core/config';

/**
 *
 */
export class TanStackQueryEngine extends QueryEngineBase<
	QueryClient,
	QueryClientConfig
> {
	/**
	 * Constructor
	 *
	 * @param config configuration
	 */
	// eslint-disable-next-line no-useless-constructor -- This is a constructor of child class
	constructor( config: QueryClientConfig ) {
		super( config );
	}

	/**
	 * Create a new client
	 *
	 * @param config configuration
	 *
	 * @return The client
	 */
	override createClient( config: QueryClientConfig ): QueryClient {
		return new QueryClient( config );
	}

	/**
	 * Get the client
	 *
	 * @return The client
	 */
	override getClient(): QueryClient {
		return this.client;
	}

	/**
	 * Use the client
	 *
	 * @param client Optional client
	 *
	 * @return The client
	 */
	useClient( client?: QueryClient ) {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook
		return useQueryClient( client );
	}

	/**
	 *
	 * @param key.key
	 * @param key
	 * @param query
	 * @param variables
	 * @param key.query
	 * @param key.variables
	 */
	async fetchQuery( {
		key,
		query,
		variables,
	}: {
		key: string[];
		query: DocumentNode;
		variables: Record< string, unknown > | undefined;
	} ): Promise< unknown > {
		const graphqlUrl = getGraphqlUrl();
		const data = await this.client.fetchQuery( {
			queryKey: key,
			queryFn: makeGraphQLRequest( graphqlUrl, query, variables ),
		} );
		return {
			data,
		};
	}
}

/**
 *
 * @param url
 * @param query
 * @param variables
 */
const makeGraphQLRequest = (
	url: string,
	query: DocumentNode,
	variables: Record< string, unknown > | undefined
) => {
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
