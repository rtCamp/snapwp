import type { CodegenConfig } from '@graphql-codegen/cli';

const baseConfig: CodegenConfig = {
	overwrite: true,
	generates: {
		'src/__generated/': {
			preset: 'client',
			plugins: [],
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				maybeValue: 'T | null',
			},
		},
	},
};

export default baseConfig;
