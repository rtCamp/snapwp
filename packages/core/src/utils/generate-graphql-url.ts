import { Logger } from '@/logger';

/**
 * Generates the complete GraphQL URL based on env vars.
 *
 * @param {string} homeUrl         The home URL.
 * @param {string} graphqlEndpoint The GraphQL endpoint.
 *
 * @return The complete GraphQL URL.
 */
export function generateGraphqlUrl(
	homeUrl?: string,
	graphqlEndpoint?: string
): string {
	// Adding extra check because there is high chances of process.env.NEXT_PUBLIC_WP_HOME_URL and process.env.GRAPHQL_ENDPOINT being undefined
	if ( ! homeUrl ) {
		Logger.error( 'wpHomeUrl is not set' );
		return '';
	}

	if ( ! graphqlEndpoint ) {
		Logger.error( 'graphqlEndpoint is not set' );
		return '';
	}

	// This will take care of adding any required slashes or removing slashes
	return new URL( graphqlEndpoint, homeUrl ).toString();
}
