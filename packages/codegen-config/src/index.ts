import type { CodegenConfig } from '@graphql-codegen/cli';

export const baseConfig: CodegenConfig = {
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
};
