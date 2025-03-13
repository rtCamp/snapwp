/**
 * Removes all HTML tags from a given string.
 *
 * @param html - The HTML string to be stripped.
 * @return The cleaned text without HTML tags.
 */
export default function stripHtml( html: string ) {
	return html.replace( /<\/?[^>]+(>|$)/g, '' ).trim();
}
