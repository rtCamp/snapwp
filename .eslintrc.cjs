module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: '@snapwp/eslint-config',
	parser: '@typescript-eslint/parser',
	ignorePatterns: [
		'**/__generated/',
		'**/.eslintrc.cjs',
		'**/config/*.js',
		'**/dist',
		'**/dist/**',
		'**/dist-types/**',
		'**/eslint-config/**',
		'**/node_modules/**',
		'assets/**/*.js',
		'data/**',
		'coverage/**',
		'out/**',
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
				// Disable check for default import.
				'import/default': [ 'off' ],
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
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/*.test.ts',
				'**/*.test.tsx',
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
				// Disable forced use of import.
				'@typescript-eslint/no-require-imports': 'off',
				// Disable force comment description.
				'eslint-comments/require-description': 'off',
				// Allow empty functions.
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': 'off',
			},
		},
	],
	rules: {
		'@typescript-eslint/naming-convention': 'error',
		'@typescript-eslint/no-restricted-imports': [
			'error',
			'classnames',
			'lodash',
		],
		'@wordpress/dependency-group': 'error',
		'dot-notation': [ 'error', { allowKeywords: false } ],
		'eslint-comments/require-description': 'error',
		'import/default': 'error',
		'import/named': 'error',
		'jest/expect-expect': 'off',
		'jsdoc/no-types': [ 'off' ],
		'jsdoc/require-param-type': [ 'error' ],
		'jsdoc/require-returns-type': [ 'error' ],
		'jsx-closing-tag-location': [ 1, { location: 'line-aligned' } ],
		'no-empty-function': 'error',
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
		'no-restricted-syntax': [ 'error' ],
		'prefer-destructuring': [
			'error',
			{
				array: true,
				object: true,
			},
		],
		'react/jsx-boolean-value': 'error',
		'react/jsx-curly-brace-presence': [
			'error',
			{ children: 'never', props: 'never' },
		],
	},
};
