/**
 * Generates a CSS class name for a given color context and color slug.
 *
 * @param colorContextName - The context name for the color (e.g., 'background', 'text').
 * @param colorSlug - The slug for the color (e.g., 'primary', 'secondary').
 *
 * @return {string|undefined} The generated CSS class name or undefined if parameters are missing.
 */
export default function getColorClassName(
	colorContextName?: string,
	colorSlug?: string
): string | undefined {
	if ( ! colorContextName || ! colorSlug ) {
		return undefined;
	}

	return `has-${ colorSlug }-${ colorContextName }`;
}
