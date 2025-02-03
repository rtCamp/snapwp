module.exports = {
	extends: '@snapwp/eslint-config',
	settings: {
		'import/resolver': require.resolve( './import-resolver.cjs' ),
	},
};
