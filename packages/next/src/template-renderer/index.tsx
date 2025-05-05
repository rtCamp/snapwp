import { headers } from 'next/headers';
import Script from 'next/script';
import { QueryEngine } from '@snapwp/query';
import { LightboxOverlay } from './lightbox-overlay';
import { TemplateHead } from './template-head';
import { TemplateScripts } from './template-scripts';

import type { BlockData } from '@snapwp/types';
import type { ReactNode } from 'react';

export type TemplateRendererProps = {
	getTemplateData?: ( typeof QueryEngine )[ 'getTemplateData' ];
	children: ( editorBlocks: BlockData[] ) => ReactNode;
};

/**
 * Renders a full HTML document including the head, body, and scripts.
 * Combines custom styles, block content, and scripts into a complete page.
 *
 * @param {Object}                                   props                 The props for the component.
 * @param {TemplateRendererProps['getTemplateData']} props.getTemplateData A async callback to get template styles and content.
 * @param {TemplateRendererProps['children']}        props.children        The block content to render.
 *
 * @return A complete HTML document structure.
 */
export async function TemplateRenderer( {
	getTemplateData = QueryEngine.getTemplateData,
	children,
}: TemplateRendererProps ): Promise< ReactNode > {
	const headerList = await headers(); // headers() returns a Promise from NextJS 19.
	const pathname = headerList.get( 'x-current-path' );

	const { editorBlocks, bodyClasses, stylesheets, scripts, scriptModules } =
		await getTemplateData( pathname || '/' );

	if ( ! editorBlocks?.length ) {
		throw new Error(
			'Error: Unable to render content. `editorBlocks` is not defined. This may be due to missing template data or an issue with data fetching.'
		);
	}

	// @todo: Script modules should load before styles to handle ordering properly
	return (
		<>
			<TemplateHead stylesheets={ stylesheets } />
			<TemplateScripts
				scripts={ scripts }
				scriptModules={ scriptModules }
			>
				<main>
					<div className="wp-site-blocks">
						{ children( editorBlocks ) }
					</div>
				</main>
			</TemplateScripts>
			{ /* Hot Fix for adding classes to the body outside the root layout */ }

			{ /* @todo: Check if we can patch this with either the portal or the @wordpress/hooks implementation. */ }
			<LightboxOverlay />

			<Script
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={ {
					__html: `
							${ JSON.stringify( bodyClasses ) }.forEach( ( c ) => {
								document.body.classList.add( c );
							} );
						`,
				} }
			/>
		</>
	);
}
