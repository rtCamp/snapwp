import type { ReactNode } from 'react';

/**
 * A wrapper for loading fonts dynamically using next/font.
 *
 * @param {Object} props                   Props for the Font component.
 * @param {string} props.renderedFontFaces Font face data as a string.
 *
 * @return A style tag with the rendered font faces.
 *
 * @todo Implement next/font once a solution for handling literal types is determined.
 */
export default function Fonts( props: {
	renderedFontFaces: string;
} ): ReactNode {
	const { renderedFontFaces } = props;

	// @todo: we might need to proxy these for CORS.

	return (
		<style
			id="wp-fonts-local"
			dangerouslySetInnerHTML={ {
				__html: renderedFontFaces
					.replace( /<style[^>]*>/g, '' )
					.replace( /<\/style>/g, '' ),
			} }
		></style>
	);
}
