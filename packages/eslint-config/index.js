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
	settings: {
		'import/resolver': require.resolve( './import-resolver' ),
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
	],
	rules: {
		'n/no-process-env': [ 'error' ],
	},
};
