import Script from 'next/script';
import { QueryEngine } from '@snapwp/query';
import { TemplateHead } from './template-head';
import { TemplateScripts } from './template-scripts';

import type { BlockData } from '@snapwp/types';
import type { ReactNode } from 'react';

export type TemplateRendererProps = {
	getTemplateData?: ( typeof QueryEngine )[ 'getTemplateData' ];
	children: ( editorBlocks: BlockData[] ) => ReactNode;
	params: Promise< {
		slug: string[];
	} >;
};

/**
 * Renders a full HTML document including the head, body, and scripts.
 * Combines custom styles, block content, and scripts into a complete page.
 *
 * @param {Object}                                   props                 The props for the component.
 * @param {TemplateRendererProps['getTemplateData']} props.getTemplateData A async callback to get template styles and content.
 * @param {TemplateRendererProps['children']}        props.children        The block content to render.
 * @param {TemplateRendererProps['params']}          props.params          The params for the component.
 *
 * @return A complete HTML document structure.
 */
export async function TemplateRenderer( {
	getTemplateData = QueryEngine.getTemplateData,
	children,
	params,
}: TemplateRendererProps ): Promise< ReactNode > {
	const pathname = generatePathName( await params );

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

/**
 * Generates the path name for the template renderer.
 *
 * @param {Object} params The params for the component.
 * @param {string[]} params.path The path segments to join.
 *
 * @param params.slug
 * @return {string} The generated path name.
 */
const generatePathName = ( params: { slug: string[] } ): string => {
	if ( ! params.slug ) {
		return '/';
	}

	const path = params.slug.join( '/' );

	if ( path.length > 0 ) {
		return `/${ path }`;
	}

	return '/';
};
