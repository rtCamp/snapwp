import { getClassNamesFromString, cn } from '@/utils';

/**
 * Extracts the class names from the specified HTML element within the rendered HTML string.
 *
 * @param {string|null|undefined} renderedHtml    The rendered HTML string.
 * @param {string|undefined}      elementSelector The element selector (class, id, or tag name) If selector is not provided then it will select the first element and will return it's classNames.
 *
 * @return The extracted class names from the first occurrence of the specified element or an empty string if the element is not found.
 */
export default function findElementAndGetClassNames(
	renderedHtml?: string | null,
	elementSelector?: string
): string {
	if ( ! renderedHtml ) {
		return '';
	}

	if ( ! elementSelector ) {
		return cn( getClassNamesFromString( renderedHtml ) );
	}

	let regex;

	if ( elementSelector?.startsWith( '.' ) ) {
		elementSelector = elementSelector.slice( 1 );

		regex = new RegExp(
			`<[^>]*\\bclass\\s*=\\s*["'][^"']*\\b${ elementSelector }\\b[^"']*["'][^>]*>`
		);
	} else if ( elementSelector?.startsWith( '#' ) ) {
		elementSelector = elementSelector.slice( 1 );

		regex = new RegExp(
			`<[^>]*\\bid\\s*=\\s*["'][^"']*\\b${ elementSelector }\\b[^"']*["'][^>]*>`
		);
	} else {
		regex = new RegExp( `<\\b${ elementSelector }\\b[^>]*>` );
	}

	const matches = renderedHtml.match( regex );

	if ( ! matches ) {
		return '';
	}

	return cn( getClassNamesFromString( matches[ 0 ] ) );
}
