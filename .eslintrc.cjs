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
	settings: {
		'import/resolver': require.resolve( './config/import-resolver.cjs' ),
	},
	overrides: [
		// Disable n/no-process-env for codegen.ts file
		{
			files: [ '**/codegen.ts', '**/*.test.*', '**/jest.setup.js' ],
			rules: {
				'n/no-process-env': 'off',
				// 'dot-notation': 'off',
				// '@typescript-eslint/dot-notation': 'error',
			},
		},
	],
};
