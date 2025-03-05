import { getConfig } from '@/config';

/**
 * Check if a URL is the home URL.
 *
 * @param url The URL to check.
 *
 * @return Whether the URL is the home URL.
 */
export const isWPHomeUrl = ( url: string ): boolean => {
	const { homeUrl } = getConfig();
	return url === homeUrl || url.startsWith( homeUrl );
};

/**
 * Check if a URL is the site URL.
 *
 * @param url The URL to check.
 *
 * @return Whether the URL is the site URL.
 */
export const isWPSiteUrl = ( url: string ): boolean => {
	const { siteUrl } = getConfig();
	return url === siteUrl || url.startsWith( siteUrl );
};

/**
 * Check if a URL is internal (Site URL or Home Url).
 *
 * @param url The URL to check.
 *
 * @return Whether the URL is internal.
 */
export const isInternalUrl = ( url: string ): boolean => {
	return url.startsWith( '/' ) || isWPHomeUrl( url ) || isWPSiteUrl( url );
};
