module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',

	plugins: [ '@wordpress/eslint-plugin', 'jsdoc', 'import', 'n' ],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:jsdoc/recommended-typescript',
		'plugin:import/typescript',
	],
	ignorePatterns: [ '**/config/*.js', '**/dist' ],
	settings: {},
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
			files: [ '**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts' ],
			excludedFiles: [
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/codegen.ts',
			],
			rules: {
				'n/no-process-env': [ 'error' ],
				'dot-notation': 'off',
				'@typescript-eslint/dot-notation': 'error',
			},
			// Enable the recommended eslint checks.
			parserOptions: {
				project: true,
			},
		},
	],
	rules: {
		'n/no-process-env': [ 'error' ],
	},
};
