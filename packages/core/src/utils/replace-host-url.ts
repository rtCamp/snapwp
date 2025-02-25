/**
 * Converts the WordPress server URL to an internal one.
 *
 * @param {string} url        WP url.
 * @param {string} hostUrl    Host url to be replaced.
 * @param {string} newHostUrl Host url to be replaced with.
 *
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
