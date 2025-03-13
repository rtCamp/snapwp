module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'@snapwp/eslint-config',
		'plugin:@eslint-community/eslint-comments/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [ '@typescript-eslint', 'jest' ],
	ignorePatterns: [
		'**/__generated/',
		'**/.eslintrc.cjs',
		'**/config/*.js',
		'**/dist-types/**',
		'**/dist',
		'**/dist/**',
		'**/node_modules/**',
		'assets/**/*.js',
		'coverage/**',
		'data/**',
		'out/**',
	],
	globals: {
		globalThis: 'readonly',
	},
	settings: {
		'import/resolver': require.resolve( './config/import-resolver.cjs' ),
	},
	rules: {
		// Restrict usage of "bad" libraries.
		'@typescript-eslint/no-restricted-imports': [
			'error',
			'classnames',
			'lodash',
		],
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'classnames',
						message:
							"Please use `clsx` instead. It's a lighter and faster drop-in replacement for `classnames`.",
					},
					{
						name: 'lodash',
						message: 'Please use native functionality instead.',
					},
				],
			},
		],

		// Enforce description on directive comments.
		'@eslint-community/eslint-comments/require-description': 'error',

		// Enforce the use of dot notation over square brackets.
		'dot-notation': [ 'error', { allowKeywords: false } ],

		// Restricted syntax should error, not warn.
		'no-restricted-syntax': [ 'error' ],

		// Import rules.
		'import/default': 'error',
		'import/named': 'error',

		// Jest rules.
		'jest/expect-expect': 'off',

		// Turn of JSdoc types and use TypeScript types instead.
		'jsdoc/no-types': [ 'off' ],
		'jsdoc/require-returns': [ 'warn' ],

		// Restrict the use of empty functions.
		'no-empty-function': 'error',

		// Disallow unnecessary JSX curly braces when literals alone are enough.
		'react/jsx-curly-brace-presence': [
			'error',
			{ children: 'never', props: 'never' },
		],
		'react/jsx-boolean-value': 'error',

		// Prevent the use of any in type annotation.
		'@typescript-eslint/no-explicit-any': 'error',
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
			// Mandate doc block for arrow functions, class declarations, class expressions, function expressions, and method definition.
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
			},
		},
		// Rules for bin and cli files.
		{
			files: [ 'bin/**/*.js', 'bin/**/*.mjs', 'packages/cli/src/*.cjs' ],
			rules: {
				// Enable the use of console log.
				'no-console': 'off',
				// Enable the use of process-env.
				'n/no-process-env': 'off',
			},
		},
		// Disable n/no-process-env for `codegen.ts` file.
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
			},
		},
		{
			files: [ '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts' ],
			excludedFiles: [ '**/codegen.ts' ],
			rules: {
				'dot-notation': 'off',
				'@typescript-eslint/dot-notation': 'error',
				'@typescript-eslint/explicit-function-return-type': 'error',
			},
			parserOptions: {
				project: true,
			},
		},
		{
			files: [ '**/packages/e2e-tests/src/utils/*.ts' ],
			rules: {
				'n/no-process-env': 'off',
				'no-console': 'off',
			},
		},
	],
};
