module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	plugins: [
		'@wordpress/eslint-plugin',
		'@typescript-eslint',
		'jsdoc',
		'jest',
		'import',
		'n',
	],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:jsdoc/recommended-typescript',
		'plugin:import/typescript',
		'eslint:recommended',
	],
	rules: {
		'n/no-process-env': [ 'error' ],
		'jsdoc/no-types': [ 'off' ],
		'jsdoc/require-param-type': [ 'error' ],
		'jsdoc/require-returns-type': [ 'error' ],
		'dot-notation': [ 'error', { allowKeywords: false } ],
		'@typescript-eslint/naming-convention': 'error',
		'jest/expect-expect': 'off',
		'react/jsx-boolean-value': 'error',
		'@wordpress/dependency-group': 'error',
		'import/default': 'error',
		'import/named': 'error',
		'no-empty-function': 'error',
		'no-restricted-syntax': [ 'error' ],
		'jsx-closing-tag-location': [ 1, { location: 'line-aligned' } ],
		'eslint-comments/require-description': 'error',
		'react/jsx-curly-brace-presence': [
			'error',
			{ props: 'never', children: 'never' },
		],
		'prefer-destructuring': [
			'error',
			{
				array: true,
				object: true,
			},
		],
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'lodash',
						message: 'Please use native functionality instead.',
					},
					{
						name: 'classnames',
						message:
							"Please use `clsx` instead. It's a lighter and faster drop-in replacement for `classnames`.",
					},
				],
			},
		],
		'@typescript-eslint/no-restricted-imports': [
			'error',
			'classnames',
			'lodash',
		],
	},
};
