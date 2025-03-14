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
 * Defaults to `false` for `siteUrl` since a different `siteUrl` often indicates a different
 * `homeUrl` or WordPress directory. If `true`, only the domain is compared, which may lead to
 * incorrect matches.
 *
 * @return Whether the URL is the site URL.
 */
export const isWPSiteUrl = (
	url: string,
	ignoreProtocol: boolean = false
): boolean => {
	if ( ! isValidUrl( url ) ) {
		return false;
	}

	const { wpSiteUrl } = getConfig();

	if ( ignoreProtocol ) {
		// Compare just the domains.
		return new URL( url ).host === new URL( wpSiteUrl ).host;
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
		isWPHomeUrl( url, ignoreProtocol ) ||
		isWPSiteUrl( url, ignoreProtocol )
	);
};
