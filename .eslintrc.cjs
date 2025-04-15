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

		'@typescript-eslint/no-empty-function': 'error',
		'no-empty-function': 'error',
		'@typescript-eslint/no-require-imports': 'error',

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
		'import/no-default-export': 'error',

		// Jest rules.
		'jest/expect-expect': 'off',

		// Turn of JSdoc types and use TypeScript types instead.
		'jsdoc/no-types': [ 'off' ],
		'jsdoc/require-param-type': [ 'error' ],
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

		// Sort import statements consistently.
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'type',
				],
				pathGroups: [
					{
						pattern: '@snapwp/**',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@graphqlTypes/**',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@/**',
						group: 'internal',
						position: 'after',
					},
				],
				distinctGroup: false,
				pathGroupsExcludedImportTypes: [ 'type' ],
				// @todo enable and add 'newlines-between-types': 'never' once released in eslint-plugin-import@>2.3.1
				'newlines-between': 'ignore',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				named: {
					import: true,
					export: true,
					types: 'types-last',
				},
			},
		],
	},
	overrides: [
		{
			files: [ '**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}' ],
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

		// Typescript files.
		{
			files: [ '**/*.{ts,tsx,cts,mts}' ],
			excludedFiles: [
				'**/codegen.ts',
				'packages/query/src/**/tests/*',
				'packages/next/src/**/tests/*',
			],
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
			files: [ '**/*.test.{ts,tsx,js,jsx}' ],
			env: {
				jest: true,
			},
			rules: {
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': 'off',

		// CommonJS files.
		{
			files: [
				'**/*.cjs',
				'**/config/**/*.js',
				'**/prettier-config/index.js', // @todo make CJS
			],
			rules: {
				'@typescript-eslint/no-require-imports': 'off',
			},
		},

		// CLI package TypeScript files
		{
			files: [
				'**/packages/cli/src/**/*.{ts,cts,mts}',
				'**/packages/cli/build.cjs',
			],
			rules: {
				'n/no-process-env': 'off',
				'no-console': 'off',
			},
		},

		// Jest files.
		{
			files: [ '**/*.test.ts' ],
			env: {
				jest: true,
			},
		},

		// E2E test utility files
		{
			files: [ '**/packages/e2e-tests/src/utils/*.{ts,cts,mts}' ],
			rules: {
				'n/no-process-env': 'off',
				'no-console': 'off',
			},
		},

		// Config and setup files
		{
			files: [
				'**/codegen.ts',
				'**/*.test.{js,jsx,ts,tsx,cjs,mjs,cts,mts}',
				'**/jest.setup.{js,cjs,mjs}',
			],
			rules: {
				'n/no-process-env': 'off',
			},
		},
	],
};
