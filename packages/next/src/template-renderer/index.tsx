import * as React from 'react';
import { type JSX } from 'react';
import { headers } from 'next/headers';
import { QueryEngine } from '@snapwp/query';
import { TemplateHead } from './template-head';
import { TemplateScripts } from './template-scripts';
import Script from 'next/script';
import type { BlockData } from '@snapwp/types';

export type TemplateRendererProps = {
	getTemplateData?: ( typeof QueryEngine )[ 'getTemplateData' ];
	children: ( editorBlocks: BlockData[] ) => JSX.Element;
};

/**
 * Renders a full HTML document including the head, body, and scripts.
 * Combines custom styles, block content, and scripts into a complete page.
 *
 * @param props - The props for the component..
 * @param props.getTemplateData - A async callback to get template styles and content.
 * @param props.children - The block content to render.
 * @return A complete HTML document structure.
 */
export async function TemplateRenderer( {
	getTemplateData = QueryEngine.getTemplateData,
	children,
}: TemplateRendererProps ) {
	const headerList = await headers(); // headers() returns a Promise from NextJS 19.
	const pathname = headerList.get( 'x-current-path' );

	const { editorBlocks, bodyClasses, stylesheets, scripts, scriptModules } =
		await getTemplateData( pathname || '/' );

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
						{ /** TODO: fallback if editorBlocks isn't defined. */ }
						{ editorBlocks && children( editorBlocks ) }
					</div>
				</main>
			</TemplateScripts>
			{ /* Hot Fix for adding classes to the body outside the root layout */ }
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
