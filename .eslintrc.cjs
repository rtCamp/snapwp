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
	rules: {
		'@typescript-eslint/no-restricted-imports': [
			'error',
			'classnames',
			'lodash',
		],
		'dot-notation': [ 'error', { allowKeywords: false } ],
		'import/default': 'error',
		'import/named': 'error',
		'jest/expect-expect': 'off',
		'jsdoc/no-types': [ 'off' ],
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
	},
	overrides: [
		// Rules for JS, JSX, TS & TSX files.
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
				'import/default': [ 'off' ],
			},
		},
		// Disable n/no-process-env for `codegen.ts` file.
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
			},
		},
	],
};
