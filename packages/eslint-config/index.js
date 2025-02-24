module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	plugins: [ '@wordpress/eslint-plugin', 'import', 'jsdoc', 'n' ],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:import/typescript',
		'plugin:jsdoc/recommended-typescript',
	],
	rules: {
		'n/no-process-env': [ 'error' ],
	},
};
