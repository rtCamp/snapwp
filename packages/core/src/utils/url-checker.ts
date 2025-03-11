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
		return new URL( url ).host === new URL( wpHomeUrl ).host;
	}

	return url === wpHomeUrl || url.startsWith( wpHomeUrl );
};

/**
 * Check if a URL is the site URL.
 *
 * @param url The URL to check.
 * @param ignoreProtocol - Ignore HTTP protocol when comparing URLs.
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
		return new URL( url ).host === new URL( wpSiteUrl ).host;
	}

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
	if ( ! isValidUrl( url ) ) {
		return false;
	}

	return (
		url.startsWith( '/' ) ||
		isWPHomeUrl( url, ignoreProtocol ) ||
		isWPSiteUrl( url, ignoreProtocol )
	);
};
