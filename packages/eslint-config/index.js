module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: [ '@wordpress/eslint-plugin', '@typescript-eslint', 'jsdoc', 'jest', 'import', 'n' ],
	extends: [
		'eslint:recommended',
		'plugin:jsdoc/recommended-typescript',
		'plugin:import/typescript',
		'plugin:@wordpress/eslint-plugin/recommended',
	],
	ignorePatterns: [
		'**/config/*.js',
		'**/dist',
		'**/node_modules/**',
		'**/dist/**',
		'**/dist-types/**',
		'out/**',
		'data/**',
		'assets/**/*.js',
		'coverage/**',
		'**/__generated/',
	],
	globals: {
		globalThis: 'readonly',
	},
	settings: {
		'import/resolver': {
			typescript: {
				project: [ '../tsconfig.json', '../packages/*/tsconfig.json' ],
			},
		},
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
			files: [
				'bin/**/*.js',
				'bin/**/*.mjs',
				'packages/cli/src/*.cjs',
			],
			rules: {
				'no-console': 'off',
			},
		},
		// Disable n/no-process-env for codegen.ts file.
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
			},
		},
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
			excludedFiles: [
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/codegen.ts',
			],
			extends: [
				'plugin:@typescript-eslint/recommended-type-checked'
			],
			parserOptions: {
				project: true,
			},
			rules: {
				'@typescript-eslint/no-array-delete': 'error',
			},
		},
		{
			files: ['**/jest.*.js', '**/*.cjs', '**/*.test.ts'],
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
		{
			files: ["**/codegen.ts", "**/*.test.*"],
			rules: {
				"n/no-process-env": "off"
			},
		},
	],
	rules: {
		'n/no-process-env': [ 'error' ],
		'jsdoc/no-types': [ 'off' ],
		'jsdoc/require-param-type': [ 'error' ],
		'jsdoc/require-returns-type': [ 'error' ],
		'dot-notation': [ "error", { allowKeywords: false } ],
		'@typescript-eslint/naming-convention': 'error',
		'jest/expect-expect': 'off',
		'react/jsx-boolean-value': 'error',
		'@wordpress/dependency-group': 'error',
		'import/default': 'error',
		'import/named': 'error',
		'no-empty-function': 'error',
		'no-restricted-syntax': [ 'error' ],
		'jsx-closing-tag-location': [ 1, { location: 'line-aligned' } ],
		'eslint-comments/require-description': 'error',
		'react/jsx-curly-brace-presence': [
			'error',
			{ props: 'never', children: 'never' },
		],
		'prefer-destructuring': [
			'error',
			{
				array: true,
				object: true,
			},
		],
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'lodash',
						message: 'Please use native functionality instead.',
					},
					{
						name: 'classnames',
						message:
							'Please use `clsx` instead. It\'s a lighter and faster drop-in replacement for `classnames`.',
					},
				],
			},
		],
		'@typescript-eslint/no-restricted-imports': [
			'error',
			'classnames',
			'lodash',
		],
	},
};
