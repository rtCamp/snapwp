import { compileCSS } from '@wordpress/style-engine';
import getStyleObjectFromString from './get-style-object-from-string';
import type { CSSProperties } from 'react';

interface AttributesWithStyle {
	style?: string | undefined;
}

/**
 * Extracts and compiles styles from attributes.
 *
 * @param {Object}                       attributes - Object containing a style string.
 * @param {AttributesWithStyle['style']} attributes.style - The style string to compile.
 *
 * @return Compiled styles as an object or an empty object if no styles exist.
 */
export default function getStylesFromAttributes( {
	style,
}: AttributesWithStyle ): CSSProperties | undefined {
	if ( ! style ) {
		return undefined;
	}

	const compiledStyles = compileCSS( JSON.parse( style ) );

	return getStyleObjectFromString( compiledStyles ) || undefined;
}
