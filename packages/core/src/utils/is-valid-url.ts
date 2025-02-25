/**
 * Check if the URL is valid.
 *
 * @param {string} str A string to be validated as a URL.
 *
 * @return flag signifying validity.
 *
 * @internal
 */
export default function isValidUrl( str: string ) {
	// When an invalid URL is passed, URL() throws an error. If an error is thrown, we will return false.
	try {
		const url = new URL( str );
		return !! url;
	} catch ( e ) {
		return false;
	}
}
