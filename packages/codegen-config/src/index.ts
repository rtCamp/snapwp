import type { CodegenConfig } from '@graphql-codegen/cli';

const baseConfig: CodegenConfig = {
	overwrite: true,
	generates: {
		'src/__generated/': {
			preset: 'client',
			plugins: [],
			config: {
				enumsAsTypes: true,
				skipTypename: true,
				useTypeImports: true,
				useImplementingTypes: true,
				avoidOptionals: false,
			},
		},
	},
};

export default baseConfig;
