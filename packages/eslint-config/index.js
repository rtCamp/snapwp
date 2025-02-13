module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	plugins: [
		'@typescript-eslint',
		'@wordpress/eslint-plugin',
		'import',
		'n',
		'jest',
		'jsdoc',
	],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:jsdoc/recommended-typescript',
		'plugin:import/typescript',
		'eslint:recommended',
	],
	rules: {
		'n/no-process-env': [ 'error' ],
	},
};
