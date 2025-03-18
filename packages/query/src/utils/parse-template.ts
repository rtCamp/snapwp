import {
	Logger,
	type EnqueuedScriptProps,
	type StyleSheetProps,
	type ScriptModuleProps,
	TemplateParseError,
} from '@snapwp/core';
import type { BlockData } from '@snapwp/types';
import type { ApolloQueryResult } from '@apollo/client';
import type { GetCurrentTemplateQuery } from '@graphqlTypes/graphql';

/**
 * Parses template query data into props for rendering a template.
 *
 * @param queryData - The data fetched from the template query.
 * @param wordpressUrl - The base URL of the WordPress site.
 * @param uri - The URI of the template.
 *
 * @return An object containing parsed template data.
 */
export default function parseQueryResult(
	queryData: ApolloQueryResult< GetCurrentTemplateQuery >,
	wordpressUrl: string,
	uri: string
) {
	if ( queryData.errors?.length ) {
		queryData.errors?.forEach( ( error ) => {
			Logger.error(
				`Error fetching template data: ${ error?.message }.`,
				'(Please refer to our FAQs for steps to debug and fix)', // @TODO: update FAQs with URL.
				error
			);
		} );
	}

	// If there is no data or templateByUri in the query data and there are errors, throw an error.
	if (
		( ! queryData.data || ! queryData.data.templateByUri ) &&
		queryData.errors?.length
	) {
		throw new TemplateParseError(
			`Error fetching template data for uri: ${ uri }`
		);
	}

	const templateByUri = queryData.data?.templateByUri;

	return {
		stylesheets: parseEnqueuedStylesheets( wordpressUrl, templateByUri ),
		editorBlocks: parseEditorBlocks( templateByUri ),
		scripts: parseEnqueuedScripts( templateByUri, wordpressUrl ),
		scriptModules: parseScriptModules( templateByUri, wordpressUrl ),
		bodyClasses: parseBodyClasses( templateByUri ),
	};
}

/**
 * Gets and validates the body classes from the query data.
 *
 * @param templateByUri The template data fetched for the uri.
 *
 * @return The body classes.
 */
function parseBodyClasses(
	templateByUri: GetCurrentTemplateQuery[ 'templateByUri' ]
): string[] | undefined {
	const bodyClasses: string[] | undefined = [];

	templateByUri?.bodyClasses?.forEach( ( bodyClass: unknown ) => {
		if ( bodyClass && 'string' === typeof bodyClass ) {
			bodyClasses.push( bodyClass );
		}
	} );

	if ( bodyClasses.length ) {
		return bodyClasses;
	}

	return undefined;
}

/**
 * Gets and validates the enqueued scripts from the query data.
 *
 * @param templateByUri The template data fetched for the uri.
 * @param wordpressUrl The base URL of the WordPress site.
 *
 * @return The enqueued scripts.
 */
function parseEnqueuedScripts(
	templateByUri: GetCurrentTemplateQuery[ 'templateByUri' ],
	wordpressUrl: string
): EnqueuedScriptProps[] | undefined {
	return templateByUri?.enqueuedScripts?.nodes?.map(
		( script: EnqueuedScriptProps ) => {
			return {
				// Ensure the src is an absolute URL.
				src: script?.src?.startsWith( '/' )
					? wordpressUrl + script.src
					: script.src ?? null,
				handle: script.handle ? script.handle : null,
			};
		}
	);
}

/**
 * Gets and validates the editor blocks from the query data.
 *
 * @param templateByUri The template data fetched for the uri.
 *
 * @return The editor blocks.
 */
function parseEditorBlocks(
	templateByUri: GetCurrentTemplateQuery[ 'templateByUri' ]
): BlockData[] | undefined {
	const editorBlocks: BlockData[] | undefined = [];

	templateByUri?.editorBlocks?.forEach( ( editorBlock: unknown ) => {
		if ( editorBlock && 'object' === typeof editorBlock ) {
			editorBlocks.push( editorBlock as BlockData );
		}
	} );

	if ( editorBlocks.length ) {
		return editorBlocks;
	}

	return undefined;
}

/**
 * Gets and validates the enqueued stylesheets from the query data.
 *
 * @param wordpressUrl The base URL of the WordPress site.
 * @param templateByUri The template data fetched for the uri.
 *
 * @return The enqueued stylesheets.
 */
function parseEnqueuedStylesheets(
	wordpressUrl: string,
	templateByUri?: GetCurrentTemplateQuery[ 'templateByUri' ]
): StyleSheetProps[] | undefined {
	return templateByUri?.enqueuedStylesheets?.nodes?.map( ( stylesheet ) => ( {
		before: stylesheet?.before?.join( '' ) || null,
		after: stylesheet?.after?.join( '' ) || null,
		src:
			( stylesheet?.src?.startsWith( '/' )
				? wordpressUrl + stylesheet.src
				: stylesheet?.src ) || null,
		handle: stylesheet?.handle || null,
	} ) );
}

/**
 * Gets and validates the script modules from the query data.
 *
 * @param templateByUri The template data fetched for the uri.
 * @param wordpressUrl The base URL of the WordPress site.
 *
 * @return The script modules.
 */
function parseScriptModules(
	templateByUri: GetCurrentTemplateQuery[ 'templateByUri' ],
	wordpressUrl: string
): ScriptModuleProps[] | undefined {
	return (
		templateByUri?.enqueuedScriptModules?.nodes?.map( ( script ) => ( {
			handle: script?.handle ?? null,
			src: script?.src?.startsWith( '/' )
				? `${ wordpressUrl }${ script.src }`
				: script?.src ?? null,
			extraData: script?.extraData || null,
			dependencies:
				script?.dependencies
					?.filter(
						( dep ): dep is NonNullable< typeof dep > =>
							!! dep &&
							!! dep.connectedScriptModule?.handle &&
							!! dep.connectedScriptModule?.src
					)
					.map( ( dep ) => ( {
						importType: dep.importType ?? null,
						connectedScriptModule: {
							handle: dep.connectedScriptModule!.handle!,
							src: dep.connectedScriptModule!.src!.startsWith(
								'/'
							)
								? `${ wordpressUrl }${
										dep.connectedScriptModule!.src
								  }`
								: dep.connectedScriptModule!.src!,
						},
					} ) ) ?? null,
		} ) ) ?? undefined
	);
}
