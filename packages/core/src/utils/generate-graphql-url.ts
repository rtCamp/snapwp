import { Logger } from '@/logger';

/**
 * Generates the complete GraphQL URL based on env vars.
 *
 * @param homeUrl The home URL.
 * @param graphqlEndpoint The GraphQL endpoint.
 *
 * @return The complete GraphQL URL.
 */
export default function generateGraphqlUrl(
	homeUrl?: string,
	graphqlEndpoint?: string
): string {
	// Adding extra check because there is high chances of process.env.NEXT_PUBLIC_WORDPRESS_HOME_URL and process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT being undefined
	if ( ! homeUrl ) {
		Logger.error( 'homeUrl is not set' );
		return '';
	}

	if ( ! graphqlEndpoint ) {
		Logger.error( 'graphqlEndpoint is not set' );
		return '';
	}

	// This will take care of adding any required slashes or removing slashes
	return new URL( graphqlEndpoint, homeUrl ).toString();
}
