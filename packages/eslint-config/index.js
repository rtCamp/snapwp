module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'@wordpress/eslint-plugin',
		'import',
		'n',
		'jest',
		'jsdoc',
		'@stylistic/jsx',
	],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:jsdoc/recommended-typescript',
		'plugin:import/typescript',
	],
	rules: {
		'n/no-process-env': [ 'error' ],
	},
};
