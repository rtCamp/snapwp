import type { CodegenConfig } from '@graphql-codegen/cli';
import { generateGraphqlUrl } from '@snapwp/core';

/**
 * Base configuration for GraphQL Codegen.
 *
 * @return The base configuration.
 */
const getBaseConfig = (): CodegenConfig => {
	return {
		overwrite: true,
		generates: {
			'src/__generated/': {
				preset: 'client',
				plugins: [],
				config: {
					enumsAsTypes: true,
					skipTypename: true,
					useTypeImports: true,
				},
			},
		},
		// Use the schema file if it's set by CI.
		// eslint-disable-next-line n/no-process-env
		schema: process.env.GRAPHQL_SCHEMA_FILE ?? [
			{
				[ generateGraphqlUrl(
					// eslint-disable-next-line n/no-process-env
					process.env.NEXT_PUBLIC_WORDPRESS_URL,
					// eslint-disable-next-line n/no-process-env
					process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
				) ]: {
					headers: {
						// eslint-disable-next-line n/no-process-env
						Authorization: `${ process.env.INTROSPECTION_TOKEN }`,
					},
				},
			},
		],
	};
};

export { getBaseConfig };
