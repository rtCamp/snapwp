import { getConfig } from '@/config';
import { isInternalUrl } from '@/utils/url-checker';

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
