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
	return (
		url.startsWith( '/' ) || url === homeUrl || url.startsWith( homeUrl )
	);
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
	return url.startsWith( siteUrl );
};

/**
 * Check if a URL is internal (Site URL or Home Url).
 *
 * @param url The URL to check.
 *
 * @return Whether the URL is internal.
 */
export const isInternalUrl = ( url: string ): boolean => {
	return isWPHomeUrl( url ) || isWPSiteUrl( url );
};

/**
 * Convert a URL to an internal URL.
 *
 * @param url The URL to convert.
 *
 * @return The internal URL.
 */
export const toInternalUrl = ( url: string ): string => {
	if ( ! isInternalUrl( url ) ) {
		return url;
	}

	const { nextUrl } = getConfig();

	if ( url.startsWith( '/' ) ) {
		return new URL( url, nextUrl ).toString();
	}

	const urlObject = new URL( url );
	const nextUrlObject = new URL( nextUrl );

	nextUrlObject.pathname = urlObject.pathname;
	nextUrlObject.search = urlObject.search;
	nextUrlObject.hash = urlObject.hash;
	nextUrlObject.password = urlObject.password;
	nextUrlObject.username = urlObject.username;

	return nextUrlObject.toString();
};
