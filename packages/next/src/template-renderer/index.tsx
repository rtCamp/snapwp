import type { JSX } from 'react';
import { headers } from 'next/headers';
import { QueryEngine } from '@snapwp/query';
import { TemplateHead } from './template-head';
import { TemplateScripts } from './template-scripts';
import Script from 'next/script';
import type { BlockData } from '@snapwp/types';
import { QueryEngineRegistry } from '@/query-engine-registry';

export type TemplateRendererProps = {
	children: ( editorBlocks: BlockData[] ) => JSX.Element;
};

/**
 * Renders a full HTML document including the head, body, and scripts.
 * Combines custom styles, block content, and scripts into a complete page.
 *
 * @param props - The props for the component.
 * @param props.children - The block content to render.
 * @return A complete HTML document structure.
 */
export async function TemplateRenderer( { children }: TemplateRendererProps ) {
	const headerList = await headers(); // headers() returns a Promise from NextJS 19.
	const pathname = headerList.get( 'x-current-path' );

	const queryEngine = QueryEngineRegistry.getInstance().getQueryEngine();
	const { editorBlocks, bodyClasses, stylesheets, scripts, scriptModules } =
		await QueryEngine.getInstance( queryEngine ).getTemplateData(
			pathname || '/'
		);

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
