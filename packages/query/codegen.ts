import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
import baseConfigs from '@snapwp/codegen-config';
import { generateGraphqlUrl } from '@snapwp/core';

dotenv.config( { path: '../../.env' } );

const config: CodegenConfig = {
	...baseConfigs,
	documents: './src/**/*.graphql',
	// Use the schema file if it's set by CI.
	schema: process.env.GRAPHQL_SCHEMA_FILE ?? [
		{
			[ generateGraphqlUrl(
				process.env.NEXT_PUBLIC_WP_HOME_URL,
				process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
			) ]: {
				headers: {
					Authorization: `${ process.env.INTROSPECTION_TOKEN }`,
				},
			},
		},
	],
};

export default config;
