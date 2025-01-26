import { type NextConfig } from 'next';
import fs from 'fs';
import { getConfig, setConfig } from '@snapwp/core/config';
import {
	ModifySourcePlugin,
	ReplaceOperation,
} from 'modify-source-webpack-plugin';

/**
 * Modifies the webpack configuration to include SnapWP configuration.
 * TODO: Explore a better approach to support Turbopack.
 *
 * @param snapWPConfigPath The path to the SnapWP configuration file.
 * @return A function that modifies the webpack configuration.
 */
const modifyWebpackConfig = ( snapWPConfigPath: string ) => {
	/**
	 * Modifies the webpack configuration. This function is called by Next.js.
	 *
	 * @param config The webpack configuration. Using `any` type as the parameter type is `any` in Next.js.
	 * @see node_modules/next/dist/server/config-shared.js:169
	 * @return The modified webpack configuration.
	 */
	return ( config: any ) => {
		const configPath = `
			import __snapWPConfig from '${ snapWPConfigPath }';
		`;

		config.plugins.push(
			new ModifySourcePlugin( {
				rules: [
					{
						/**
						 * Tests whether the module should be modified.
						 *
						 * @param normalModule The normal module being processed.
						 * @return `true` if the module should be modified, otherwise `false`.
						 */
						test: ( normalModule ) => {
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
			} )
		);

		return config;
	};
};

/**
 * Extends the Next.js configuration with SnapWP configuration.
 *
 * @param nextConfig The Next.js configuration object.
 * @return The extended configuration object.
 */
const withSnapWP = async ( nextConfig?: NextConfig ): Promise< NextConfig > => {
	const possibleSnapWPConfigPaths = [
		process.cwd() + '/snapwp.config.js',
		process.cwd() + '/snapwp.config.mjs',
	];

	// Locate the SnapWP configuration file.
	const snapWPConfigPath = possibleSnapWPConfigPaths.find( ( path ) => {
		return fs.existsSync( path );
	} );

	if ( ! snapWPConfigPath ) {
		throw new Error( 'SnapWP configuration file not found.' );
	}

	const snapWPConfig = ( await import( snapWPConfigPath ) ).default;
	setConfig( snapWPConfig );
	const homeUrl = new URL( getConfig().homeUrl );

	return {
		...nextConfig,
		images: {
			remotePatterns: [
				{
					protocol: 'http',
					hostname: homeUrl.hostname,
				},
				{
					protocol: 'https',
					hostname: homeUrl.hostname,
				},
			],
		},
		webpack: modifyWebpackConfig( snapWPConfigPath ),
	};
};

export default withSnapWP;
