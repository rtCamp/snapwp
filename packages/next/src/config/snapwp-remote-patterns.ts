import type { RemotePattern } from 'next/dist/shared/lib/image-config';

/**
 * Creates base remote patterns
 * @param {URL} homeUrl -- WordPress Home Url
 * @return Remote pattern array
 */
export const generateRemotePatterns = ( homeUrl: URL ): RemotePattern[] => {
	return [
		{
			protocol: 'http',
			hostname: homeUrl.hostname,
		},
		{
			protocol: 'https',
			hostname: homeUrl.hostname,
		},
	];
};
