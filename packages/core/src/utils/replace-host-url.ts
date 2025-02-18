/**
 * Converts the WordPress server URL to an internal one.
 *
 * @param url - WP url.
 * @param hostUrl - Host url to be replaced.
 * @param newHostUrl - Host url to be replaced with.
 * @return The internal url.
 *
 * @internal
 */
export default function replaceHostUrl(
	url: string,
	hostUrl: string,
	newHostUrl: string
) {
	if ( url && hostUrl && url.startsWith( hostUrl ) ) {
		return url.replace( hostUrl, newHostUrl );
	}

	return url;
}
