/**
 * Removes all HTML tags from a given string.
 *
 * @param html - The HTML string to be stripped.
 * @return The cleaned text without HTML tags.
 */
export default function getCleanExcerpt( html: string ): string {
	const text = html.replace( /<\/?[^>]+(>|$)/g, '' ).trim();
	const words = text.split( /\s+/ ).slice( 0, 25 );
	return words.join( ' ' );
}
