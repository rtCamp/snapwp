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
		// Rules for JS, JSX, TS & TSX files.
		{
			files: [ '**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx' ],
			rules: {
				// Mandate doc block for arrow functions, class declarations, class expressions, function expressions, and method definition.
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
				// Disable check for default import.
				'import/default': [ 'off' ],
			},
		},
		// Rules for bin and cli files.
		{
			files: [ 'bin/**/*.js', 'bin/**/*.mjs', 'packages/cli/src/*.cjs' ],
			rules: {
				// Enable console log.
				'no-console': 'off',
			},
		},
		// Disable n/no-process-env for codegen.ts, test and jest setup files.
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
			},
		},
		// Rules for TypeScript files.
		{
			files: [ '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts' ],
			excludedFiles: [
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/codegen.ts',
			],
			// Enable the recommended eslint checks.
			extends: [ 'plugin:@typescript-eslint/recommended-type-checked' ],
			parserOptions: {
				project: true,
			},
		},
		// Enable jest & node env for cjs, test & jest files.
		{
			files: [ '**/jest.*.js', '**/*.cjs', '**/*.test.ts' ],
			env: {
				node: true,
				'jest/globals': true,
			},
			rules: {
				// Allow empty functions.
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				// Disable force comment description.
				'eslint-comments/require-description': 'off',
				// Disable forced use of import.
				'@typescript-eslint/no-require-imports': 'off',
			},
		},
	],
};
