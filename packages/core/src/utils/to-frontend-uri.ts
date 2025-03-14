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

	// Not ignoring protocol as we want to check for complete site URL.
	const domainToUpdate = isWPSiteUrl( url ) ? wpSiteUrl : wpHomeUrl;

	return addLeadingSlash( url.replace( domainToUpdate, '' ) );
};
