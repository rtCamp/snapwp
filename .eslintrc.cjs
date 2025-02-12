module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: '@snapwp/eslint-config',
	parser: '@typescript-eslint/parser',
	ignorePatterns: [
		'**/node_modules/**',
		'**/dist/**',
		'**/dist-types/**',
		'out/**',
		'data/**',
		'assets/**/*.js',
		'coverage/**',
		'**/config/*.js',
		'**/dist',
		'**/__generated/',
		'**/.eslintrc.cjs',
		'**/eslint-config/**',
	],
	globals: {
		globalThis: 'readonly',
	},
	settings: {
		'import/resolver': require.resolve( './config/import-resolver.cjs' ),
	},
	overrides: [
		{
			files: '**/*.test.ts',
			env: {
				jest: true,
			},
		},
		{
			files: [ '**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx' ],
			rules: {
				'jsdoc/require-jsdoc': [
					'error',
					{
						require: {
							ArrowFunctionExpression: true,
							ClassDeclaration: true,
							ClassExpression: true,
							FunctionExpression: true,
							MethodDefinition: true,
						},
					},
				],
				'import/default': [ 'off' ],
			},
		},
		{
			files: [ 'bin/**/*.js', 'bin/**/*.mjs', 'packages/cli/src/*.cjs' ],
			rules: {
				'no-console': 'off',
			},
		},
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
			},
		},
		{
			files: [ '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts' ],
			excludedFiles: [
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/codegen.ts',
			],
			extends: [ 'plugin:@typescript-eslint/recommended-type-checked' ],
			parserOptions: {
				project: true,
			},
			rules: {
				'@typescript-eslint/no-array-delete': 'error',
			},
		},
		{
			files: [ '**/jest.*.js', '**/*.cjs', '**/*.test.ts' ],
			env: {
				node: true,
				'jest/globals': true,
			},
			rules: {
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'eslint-comments/require-description': 'off',
				'@typescript-eslint/no-require-imports': 'off',
			},
		},
	],
};
