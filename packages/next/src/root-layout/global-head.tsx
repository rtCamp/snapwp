import React from 'react';
import Fonts from '@/components/font';
import { type GlobalHeadProps } from '@snapwp/core';

/**
 * Renders the head section with custom styles, block styles, global stylesheet,
 * rendered font faces for the global context.
 *
 * @param props - The props for the component.
 * @param props.customCss - Custom CSS to be included.
 * @param props.globalStylesheet - Global stylesheet for the page.
 * @param props.renderedFontFaces - Font faces rendered locally.
 * @return A head element containing the provided styles and links.
 */
export function GlobalHead( {
	customCss,
	globalStylesheet,
	renderedFontFaces,
}: GlobalHeadProps ) {
	return (
		<>
			{ globalStylesheet && (
				<style
					id={ 'stylesheet' }
					dangerouslySetInnerHTML={ { __html: globalStylesheet } }
				>
					{ /* Styles are set via `dangerouslySetInnerHTML`. */ }
				</style>
			) }

			{ renderedFontFaces && (
				<Fonts renderedFontFaces={ renderedFontFaces } />
			) }

			{ customCss && (
				<style
					id={ 'customCSS' }
					dangerouslySetInnerHTML={ { __html: customCss } }
				>
					{ /* Styles are set via `dangerouslySetInnerHTML`. */ }
				</style>
			) }
		</>
	);
}
