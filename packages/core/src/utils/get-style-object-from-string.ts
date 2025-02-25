import type { CSSProperties } from 'react';
import { Logger } from '@/logger';

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
		// eslint-disable-next-line @wordpress/no-unused-vars-before-return
		const [ property, ...value ] = el.split( ':' );

		if ( ! property ) {
			return;
		}

		const formattedProperty = formatStringToCamelCase( property.trim() );
		style[ formattedProperty ] = value.join( ':' ).trim();
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
export default function getStyleObjectFromString(
	css: object | string
): CSSProperties {
	// If object is given, return object (could be react style object mistakenly provided)
	if ( typeof css === 'object' ) {
		return css as CSSProperties;
	}

	// If falsy, then probably empty string or null, nothing to be done there
	if ( ! css ) {
		return {} as CSSProperties;
	}

	// Only accepts strings
	if ( typeof css !== 'string' ) {
		Logger.error(
			`Unexpected type "${ typeof css }" when expecting string, with value "${ css }"`
		);
		return {} as CSSProperties;
	}

	const style = cssToReactStyle( css );

	return style;
}
