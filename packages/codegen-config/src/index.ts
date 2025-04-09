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
			},
		},
	},
};

// eslint-disable-next-line import/no-default-export -- this serves as an entry point and needs a default export.
export default baseConfig;
