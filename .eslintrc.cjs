module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: '@snapwp/eslint-config',
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
	],
	globals: {
		globalThis: 'readonly',
	},
	overrides: [
		// Disable n/no-process-env for codegen.ts file
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
			},
		},
	],
};
