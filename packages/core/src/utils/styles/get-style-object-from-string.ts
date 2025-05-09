import { Logger } from '@/logger';
import type { CSSProperties } from 'react';

/**
 * Formats a string to camel case.
 *
 * @param {string} str The input string.
 *
 * @return The camelcase string.
 *
 * @internal
 */
function formatStringToCamelCase( str: string ): string {
	const splitted = str.split( '-' ).filter( ( word ) => !! word );

	if ( splitted.length === 1 ) {
		return splitted[ 0 ]!;
	}

	return (
		splitted[ 0 ] +
		splitted
			.slice( 1 )
			.map( ( word ) => {
				return word[ 0 ]!.toUpperCase() + word.slice( 1 );
			} )
			.join( '' )
	);
}

/**
 * Converts a CSS string to an object.
 *
 * @param {string} str The CSS string.
 *
 * @return The style object.
 */
function cssToReactStyle( str: string ): CSSProperties {
	const style: { [ key: string ]: string } = {}; // add index signature here

	str.split( ';' ).forEach( ( el ) => {
		const splitEl = el.split( ':' );
		const property = splitEl.shift();

		if ( ! property ) {
			return;
		}

		const formattedProperty = formatStringToCamelCase( property.trim() );
		style[ formattedProperty ] = splitEl.join( ':' ).trim();
	} );

	return style;
}

/**
 * Converts a CSS string or object to a React style object.
 *
 * @param {Object|string} css The CSS string.
 *
 * @return The style object.
 */
export function getStyleObjectFromString(
	css: object | string
): CSSProperties | undefined {
	// If object is given, return object (could be react style object mistakenly provided)
	if ( typeof css === 'object' ) {
		// If it's an empty object, return undefined
		if ( Object.keys( css ).length === 0 ) {
			return undefined;
		}

		return css as CSSProperties;
	}

	// If falsy, then probably empty string or null, nothing to be done there
	if ( ! css ) {
		return undefined;
	}

	// Only accepts strings
	if ( typeof css !== 'string' ) {
		Logger.error(
			`Unexpected type "${ typeof css }" when expecting string, with value "${ css }"`
		);
		return undefined;
	}

	const style = cssToReactStyle( css );

	return style;
}
