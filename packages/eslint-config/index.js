module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	plugins: [ '@wordpress/eslint-plugin', 'import', 'jsdoc', 'n' ],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:import/typescript',
		'plugin:jsdoc/recommended-typescript',
		'plugin:@eslint-community/eslint-comments/recommended',
	],
	rules: {
		'n/no-process-env': [ 'error' ],
	},
};
