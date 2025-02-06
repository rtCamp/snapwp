import type { CodegenConfig } from '@graphql-codegen/cli';
import { generateGraphqlUrl } from '@snapwp/core';

/**
 * Base configuration for GraphQL Codegen.
 *
 * @return The base configuration.
 */
const baseConfig = (): CodegenConfig => {
	return {
		overwrite: true,
		generates: {
			'src/__generated/': {
				preset: 'client',
				plugins: [],
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

/**
 * Extend the base configuration with the provided configuration.
 *
 * @param config The configuration to extend the base configuration with.
 *
 * @return The extended configuration.
 */
const withCodegenConfig = (
	config: Partial< CodegenConfig >
): CodegenConfig => {
	return {
		...baseConfig(),
		...config,
	};
};

export { withCodegenConfig };
