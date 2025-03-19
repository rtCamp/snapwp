import { getConfig } from '@/config';
import { isInternalUrl, isWPSiteUrl } from '@/utils/url-checker';
import { addLeadingSlash } from '@/utils/url-slash-modify';

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
