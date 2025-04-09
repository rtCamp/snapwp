import {
	ModifySourcePlugin,
	ReplaceOperation,
} from 'modify-source-webpack-plugin';

/**
 * Generates webpack plugin array required for SnapWP packges to work.
 * @param {string} snapWPConfigPath -- Path to snapwp config file
 * @return Webpack config
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Using `any` type as the parameter type is `any` in Next.js.
export const getWebpackPlugins = ( snapWPConfigPath: string ): any => {
	if ( ! snapWPConfigPath ) {
		throw new Error( 'SnapWP configuration file not found.' );
	}
	const configPath = `
           import __snapWPConfig from '${ snapWPConfigPath }';
        `;

	return [
		new ModifySourcePlugin( {
			rules: [
				{
					// eslint-disable-next-line jsdoc/require-jsdoc -- inline function
					test: ( normalModule ): boolean => {
						const userRequest = normalModule.userRequest || '';

						const startIndex =
							userRequest.lastIndexOf( '!' ) === -1
								? 0
								: userRequest.lastIndexOf( '!' ) + 1;

						const moduleRequest = userRequest
							.substring( startIndex )
							.replace( /\\/g, '/' );

						return /snapwp-config-manager.(ts|js)$/.test(
							moduleRequest
						);
					},
					operations: [
						new ReplaceOperation(
							'once',
							"'use snapWPConfig';",
							configPath
						),
					],
				},
			],
		} ),
	];
};
