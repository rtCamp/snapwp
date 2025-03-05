import { getConfig } from '@/config';
import { isInternalUrl, isWPHomeUrl } from '@/utils/url-checker';
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

	if ( url.startsWith( '/' ) ) {
		return url;
	}

	const { homeUrl, siteUrl } = getConfig();

	if ( isWPHomeUrl( url ) ) {
		return addLeadingSlash( url.replace( homeUrl, '' ) );
	}

	return addLeadingSlash( url.replace( siteUrl, '' ) );
};
