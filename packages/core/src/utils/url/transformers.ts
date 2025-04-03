import { getConfig } from '@/config';
import { isInternalUrl, isWPSiteUrl } from './validators';

/**
 * Convert a URL to an internal URL.
 *
 * @param url The URL to convert.
 *
 * @return The internal URL.
 */
export const toFrontendUri = ( url: string ): string => {
	if ( ! isInternalUrl( url ) ) {
		return url;
	}

	// Bail if already a URI.
	if ( url.startsWith( '/' ) ) {
		return url;
	}

	const { wpHomeUrl, wpSiteUrl } = getConfig();

	const domainToUpdate = isWPSiteUrl( url ) ? wpSiteUrl : wpHomeUrl;

	// Remove protocol before replacement.
	const normalizedDomain = domainToUpdate.replace( /^https?:\/\//, '' );
	const normalizedUrl = url.replace( /^https?:\/\//, '' );

	return addLeadingSlash( normalizedUrl.replace( normalizedDomain, '' ) );
};

/**
 * Remove trailing slash from the URL.
 *
 * @param url The URL to modify.
 *
 * @return The modified URL.
 *
 * @internal
 */
export function removeTrailingSlash( url: string ): string {
	return url.replace( /\/$/, '' );
}

/**
 * Add trailing slash to the URL.
 *
 * @param url The URL to modify.
 *
 * @return The modified URL.
 *
 * @internal
 */
export function addTrailingSlash( url: string ): string {
	return url.endsWith( '/' ) ? url : `${ url }/`;
}

/**
 * Remove leading slash from the URL.
 *
 * @param url The URL to modify.
 *
 * @return The modified URL.
 *
 * @internal
 */
export function removeLeadingSlash( url: string ): string {
	return url.replace( /^\//, '' );
}

/**
 * Add leading slash to the URL.
 *
 * @param url The URL to modify.
 *
 * @return The modified URL.
 *
 * @internal
 */
export function addLeadingSlash( url: string ): string {
	return url.startsWith( '/' ) ? url : `/${ url }`;
}
