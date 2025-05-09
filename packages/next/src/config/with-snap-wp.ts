import { getConfig, setConfig } from '@snapwp/core/config';

import { getSnapWPConfigPath } from './get-snap-wp-config-path';
import { getWebpackPlugins } from './get-snap-wp-webpack-plugins';
import { generateRemotePatterns } from './snapwp-remote-patterns';

import type { NextConfig } from 'next';
import type { WebpackConfigContext } from 'next/dist/server/config-shared';

/**
 * Extends the Next.js configuration with SnapWP configuration.
 *
 * @param {NextConfig} nextConfig The Next.js configuration object.
 *
 * @return The extended configuration object.
 */
export const withSnapWP = async (
	nextConfig: NextConfig
): Promise< NextConfig > => {
	setConfig();

	const snapWPConfigPath = getSnapWPConfigPath();
	const homeUrl = new URL( getConfig().wpHomeUrl );

	const snapWPRemotePatterns = generateRemotePatterns( homeUrl );

	const snapWPWebpackPlugins = getWebpackPlugins( snapWPConfigPath );

	const userImages = nextConfig?.images ?? {};
	const userRemotePatterns = userImages.remotePatterns ?? [];

	// When adding a new customization to generated next config, remember to merge user's config.
	return {
		...nextConfig,
		images: {
			...userImages,
			remotePatterns: [ ...snapWPRemotePatterns, ...userRemotePatterns ],
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, jsdoc/require-jsdoc -- Inline function do not require doc. Any comes from NextJs's type
		webpack: ( config: any, context: WebpackConfigContext ): any => {
			if ( nextConfig.webpack ) {
				config = nextConfig.webpack( config, context );
			}
			config.plugins.push( ...snapWPWebpackPlugins );
			return config;
		},
	};
};
