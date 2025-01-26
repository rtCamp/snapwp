import React from 'react';

/**
 * A wrapper for loading fonts dynamically using next/font.
 *
 * @param props - Props for the Font component.
 * @param props.renderedFontFaces - Font face data as a string.
 * @return A style tag with the rendered font faces.
 *
 * @todo Implement next/font once a solution for handling literal types is determined.
 */
export default function Fonts( props: { renderedFontFaces: string } ) {
	const { renderedFontFaces } = props;
	return (
		<style
			id="wp-fonts-local"
			dangerouslySetInnerHTML={ {
				__html: renderedFontFaces
					?.replace( "<style id='wp-fonts-local'>", '' )
					?.replace( '</style>\n', '' ),
			} }
		></style>
	);
}
