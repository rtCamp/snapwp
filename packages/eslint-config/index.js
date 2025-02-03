module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: [ 'jsdoc', 'import', 'n' ],
	extends: [
		'plugin:jsdoc/recommended-typescript',
		'plugin:import/typescript',
	],
	ignorePatterns: [
		'**/config/*.js',
		'**/dist',
		"**/node_modules/**",
		"**/dist/**",
		"**/dist-types/**",
		"out/**",
		"data/**",
		"assets/**/*.js",
		"coverage/**",
		"**/__generated/"
	],
	"globals": {
		"globalThis": "readonly"
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
		// Disable n/no-process-env for codegen.ts file.
		{
			"files": [ "**/codegen.ts", "**/*.test.*", "**/jest.setup.js" ],
			"rules": {
				"n/no-process-env": "off"
			}
		},
	],
	rules: {
		'n/no-process-env': [ 'error' ],
		'jsdoc/no-types': [ 'off' ],
		'jsdoc/require-param-type': [ 'warn' ], // @todo: Convert current rule to error after @param types are added.
	},
};
