import type { CodegenConfig } from '@graphql-codegen/cli';
import { sync as globSync } from 'glob';
import baseConfig from '@snapwp/codegen-config';
import { generateGraphqlUrl } from '@snapwp/core';
import 'dotenv/config';

const GRAPHQL_GLOB = './src/**/*.graphql';
const graphqlFiles = globSync( GRAPHQL_GLOB );

// This is necessary because we don't have access to the Config Manager.
const graphqlUrl = generateGraphqlUrl(
	// If there's no explicit SITE_URL, it's the same as the HOME_URL.
	process.env.WP_SITE_URL || process.env.NEXT_PUBLIC_WP_HOME_URL,
	process.env.GRAPHQL_ENDPOINT
);

const config: CodegenConfig = {
	...( graphqlFiles.length > 0 && { documents: GRAPHQL_GLOB } ),
	...baseConfig,
	// Use the schema file if it's set by CI.
	schema: process.env.GRAPHQL_SCHEMA_FILE ?? [
		{
			[ graphqlUrl ]: {
				headers: {
					Authorization: `${ process.env.INTROSPECTION_TOKEN }`,
				},
			},
		},
	],
};

export default config;
