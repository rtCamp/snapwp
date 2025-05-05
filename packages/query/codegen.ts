import * as dotenv from 'dotenv';
import baseConfigs from '@snapwp/codegen-config';
import { generateGraphqlUrl } from '@snapwp/core';

import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config( { path: '../../.env' } );

// If there's no explicit SITE_URL, it's the same as the HOME_URL.
const homeUrl =
	process.env.WP_SITE_URL ||
	process.env.NEXT_PUBLIC_WP_SITE_URL ||
	process.env.WP_HOME_URL ||
	process.env.NEXT_PUBLIC_WP_HOME_URL;

const graphqlEndpoint =
	process.env.GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

// This is necessary because we don't have access to the config manager.
const graphqlUrl = generateGraphqlUrl( homeUrl, graphqlEndpoint );

const config: CodegenConfig = {
	...baseConfigs,
	documents: './src/**/*.graphql',
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

// eslint-disable-next-line import/no-default-export -- default export is required for compatibility.
export default config;
