import { Fonts } from '@/components/font';

import type { GlobalHeadProps } from '@snapwp/core';
import type { ReactNode } from 'react';

/**
 * Renders the head section with custom styles, block styles, global stylesheet,
 * rendered font faces for the global context.
 *
 * @param {Object}      props                   The props for the component.
 * @param {string|null} props.customCss         Custom CSS to be included.
 * @param {string|null} props.globalStylesheet  Global stylesheet for the page.
 * @param {string|null} props.renderedFontFaces Font faces rendered locally.
 *
 * @return A head element containing the provided styles and links.
 */
export function GlobalHead( {
	customCss,
	globalStylesheet,
	renderedFontFaces,
}: GlobalHeadProps ): ReactNode {
	return (
		<>
			{ globalStylesheet && (
				<style
					id="stylesheet"
					dangerouslySetInnerHTML={ { __html: globalStylesheet } }
				></style>
			) }

			{ renderedFontFaces && (
				<Fonts renderedFontFaces={ renderedFontFaces } />
			) }

			{ customCss && (
				<style
					id="customCSS"
					dangerouslySetInnerHTML={ { __html: customCss } }
				></style>
			) }
		</>
	);
}
