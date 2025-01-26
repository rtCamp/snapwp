import type { CodegenConfig } from '@graphql-codegen/cli';
import { sync as globSync } from 'glob';
import baseConfig from '@snapwp/codegen-config';
import { generateGraphqlUrl } from '@snapwp/core';
import 'dotenv/config';

const GRAPHQL_GLOB = './src/**/*.graphql';
const graphqlFiles = globSync( GRAPHQL_GLOB );

const config: CodegenConfig = {
	...( graphqlFiles.length > 0 && { documents: GRAPHQL_GLOB } ),
	...baseConfig,
	schema: [
		{
			[ generateGraphqlUrl(
				process.env.NEXT_PUBLIC_WORDPRESS_URL,
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
