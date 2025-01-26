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
