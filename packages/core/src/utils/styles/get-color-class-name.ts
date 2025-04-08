/**
 * Generates a CSS class name for a given color context and color slug.
 *
 * @param {string} colorContextName The context name for the color (e.g., 'background', 'text').
 * @param {string} colorSlug        The slug for the color (e.g., 'primary', 'secondary').
 *
 * @return The generated CSS class name or undefined if parameters are missing.
 */
export function getColorClassName(
	colorContextName?: string | undefined,
	colorSlug?: string | undefined
): string | undefined {
	if ( ! colorContextName || ! colorSlug ) {
		return undefined;
	}

	return `has-${ colorSlug }-${ colorContextName }`;
}
