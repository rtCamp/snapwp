import { compileCSS } from '@wordpress/style-engine';
import getStyleObjectFromString from './get-style-object-from-string';

interface AttributesWithStyle {
	style?: string | undefined;
}

/**
 * Extracts and compiles styles from attributes.
 *
 * @param attributes - Object containing a style string.
 * @return Compiled styles as an object or an empty object if no styles exist.
 */
export default function getStylesFromAttributes(
	attributes: AttributesWithStyle
) {
	if ( ! attributes?.style ) {
		return {};
	}

	const compiledStyles = compileCSS( JSON.parse( attributes.style ) );
	return getStyleObjectFromString( compiledStyles ) || {};
}
