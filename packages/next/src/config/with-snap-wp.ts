import { type NextConfig } from 'next';
import type { WebpackConfigContext } from 'next/dist/server/config-shared';

import { getConfig, setConfig } from '@snapwp/core/config';
import { deepMerge } from '@snapwp/core';

import { generateRemotePatterns } from './snapwp-remote-patterns';
import getWebpackPlugins from './get-snap-wp-webpack-plugins';
import getSnapWPConfigPath from './get-snap-wp-config-path';

/**
 * Extends the Next.js configuration with SnapWP configuration.
 *
 * @param nextConfig The Next.js configuration object.
 *
 * @return The extended configuration object.
 */
const withSnapWP = async ( nextConfig: NextConfig ): Promise< NextConfig > => {
	setConfig();

	const snapWPConfigPath = getSnapWPConfigPath();
	const homeUrl = new URL( getConfig().wpHomeUrl );

	const snapWPRemotePatterns = generateRemotePatterns( homeUrl );

	const snapWPWebpackPlugins = getWebpackPlugins( snapWPConfigPath );

	return deepMerge( nextConfig, {
		images: {
			remotePatterns: snapWPRemotePatterns,
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, jsdoc/require-jsdoc -- Inline function do not require doc. Any comes from NextJs's type
		webpack: ( config: any, context: WebpackConfigContext ): any => {
			if ( nextConfig.webpack ) {
				config = nextConfig.webpack( config, context );
			}
			config.plugins.push( ...snapWPWebpackPlugins );
			return config;
		},
	} );
};

export default withSnapWP;
