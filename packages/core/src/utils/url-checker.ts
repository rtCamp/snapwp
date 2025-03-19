import { getConfig } from '@/config';
import { isValidUrl } from '@/utils';

/**
 * Check if a URL is the home URL.
 *
 * @param url The URL to check.
 * @param ignoreProtocol - Ignore HTTP protocol when comparing URLs.
 *
 * @return Whether the URL is the home URL.
 */
export const isWPHomeUrl = (
	url: string,
	ignoreProtocol: boolean = true
): boolean => {
	if ( ! isValidUrl( url ) ) {
		return false;
	}

	const { wpHomeUrl } = getConfig();

	if ( ignoreProtocol ) {
		// Compare just the domains.
		return new URL( url ).host === new URL( wpHomeUrl ).host;
	}

	// Compare with the protocol.
	return url === wpHomeUrl || url.startsWith( wpHomeUrl );
};

/**
 * Check if a URL is the site URL.
 *
 * @param url The URL to check.
 * @param {boolean} ignoreProtocol - Whether to ignore the HTTP protocol when comparing URLs.
 *
 * @return Whether the URL is the site URL.
 */
export const isWPSiteUrl = (
	url: string,
	ignoreProtocol: boolean = true
): boolean => {
	if ( ! isValidUrl( url ) ) {
		return false;
	}

	const { wpSiteUrl } = getConfig();

	if ( ignoreProtocol ) {
		const urlObject = new URL( url );
		const siteUrlObject = new URL( wpSiteUrl );
		// Compare domain and path.
		return (
			urlObject.host === siteUrlObject.host &&
			urlObject.pathname.startsWith( siteUrlObject.pathname )
		);
	}

	// Compare with the protocol.
	return url === wpSiteUrl || url.startsWith( wpSiteUrl );
};

/**
 * Check if a URL is internal (Site URL or Home Url).
 *
 * @param url The URL to check.
 * @param ignoreProtocol - Ignore HTTP protocol when comparing URLs.
 *
 * @return Whether the URL is internal.
 */
export const isInternalUrl = (
	url: string,
	ignoreProtocol: boolean = true
): boolean => {
	return (
		url.startsWith( '/' ) ||
		isWPSiteUrl( url, ignoreProtocol ) ||
		isWPHomeUrl( url, ignoreProtocol )
	);
};
