/**
 * Extracts class names from the `class` attribute in an HTML string.
 *
 * @param html - The HTML string to parse.
 * @return An array of class names.
 */
export default function getClassNamesFromString( html: string ): string[] {
	// Match the first occurrence of the class attribute
	const classAttribute = html.match( /class=".*?"/g )?.[ 0 ];

	if ( ! classAttribute || classAttribute === 'class=""' ) {
		return [];
	}

	const classNames = classAttribute
		.replace( 'class="', '' )
		.replace( '"', '' )
		.split( ' ' )
		.filter( Boolean ); // Filter out empty strings

	return classNames;
}
