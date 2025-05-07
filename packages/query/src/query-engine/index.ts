import { getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGlobalStylesDocument,
	GetPagesToRenderStaticallyDocument,
	type GetPagesToRenderStaticallyQuery,
	type InputMaybe,
} from '@graphqlTypes/graphql';
import { fetchQuery } from '@/query-engine/registry';
import { parseQueryResult as parseGlobalStyles } from '@/utils/parse-global-styles';
import { parseQueryResult as parseTemplate } from '@/utils/parse-template';
import type {
	EnqueuedScriptProps,
	GlobalHeadProps,
	ScriptModuleProps,
	StyleSheetProps,
} from '@snapwp/core';
import type { BlockData } from '@snapwp/types';

type VariableTypes = {
	first: number;
} & {
	[ K in keyof GetPagesToRenderStaticallyQuery as `${ Extract<
		K,
		string
	> }Cursor` ]: InputMaybe< string >;
} & {
	[ K in keyof GetPagesToRenderStaticallyQuery as `hasMore${ Capitalize<
		Extract< K, string >
	> }` ]: InputMaybe< boolean >;
};

type PathInfo = {
	uri?: string | null | undefined;
	id: string;
};

/**
 * Merges additional data into the resolved data object.
 *
 * @param {Object} resolvedData - The existing resolved data.
 * @param {Object} additionalData - The new data to merge.
 *
 * @return {void}
 */
function mergeResolvedData(
	resolvedData: Record< string, PathInfo[] >,
	additionalData: Record< string, PathInfo[] >
): void {
	Object.entries( additionalData ).forEach( ( [ key, paths ] ) => {
		if ( ! resolvedData[ key ] ) {
			resolvedData[ key ] = [];
		}
		resolvedData[ key ] = [ ...resolvedData[ key ]!, ...paths ];
	} );
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @return The capitalized string.
 */
function capitalize( str: string ): string {
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
}

/**
 * Singleton class to handle GraphQL queries using Apollo.
 */
export class QueryEngine {
	/**
	 * Fetches global styles.
	 * @return The template data fetched for the uri.
	 */
	static getGlobalStyles = async (): Promise< GlobalHeadProps > => {
		const data = await fetchQuery( {
			name: 'GlobalStyles',
			query: GetGlobalStylesDocument,
		} );

		return parseGlobalStyles( data );
	};

	/**
	 * Fetches blocks, scripts and styles for the given uri.
	 * @param {string} uri - The URL of the seed node.
	 * @return The template data fetched for the uri.
	 */
	static getTemplateData = async (
		uri: string
	): Promise< {
		stylesheets: StyleSheetProps[] | undefined;
		editorBlocks: BlockData< Record< string, unknown > >[] | undefined;
		scripts: EnqueuedScriptProps[] | undefined;
		scriptModules: ScriptModuleProps[] | undefined;
		bodyClasses: string[] | undefined;
		is404: boolean;
	} > => {
		const variables = { uri };

		const data = await fetchQuery( {
			name: 'GetCurrentTemplate',
			query: GetCurrentTemplateDocument,
			options: {
				variables,
			},
		} );

		const { wpHomeUrl } = getConfig();

		return parseTemplate( data, wpHomeUrl, uri );
	};

	/**
	 * Fetches pages to be rendered statically.
	 *
	 * @param {Object} variables - The variables for the query.
	 * @return The pages to be rendered statically.
	 */
	static getPathsToStaticallyGenerate = async (
		variables: VariableTypes = {
			first: 100,
			contentNodesCursor: null,
			hasMoreContentNodes: true,
			termsCursor: null,
			hasMoreTerms: true,
			usersCursor: null,
			hasMoreUsers: true,
		}
	): Promise< Record< string, PathInfo[] > > => {
		const data = await fetchQuery( {
			name: 'GetPagesToRenderStatically',
			query: GetPagesToRenderStaticallyDocument,
			options: {
				variables: {
					...variables,
				},
			},
		} );

		if ( ! data ) {
			throw new Error(
				'Error fetching pages to render statically. No data returned.'
			);
		}

		const resolvedData: Record< string, PathInfo[] > = {};

		let shouldFetchMore = false;

		const newVariables = {
			...variables,
		};

		Object.entries( data ).forEach( ( [ key, section ] ) => {
			if ( ! section ) {
				return;
			}

			const { nodes, pageInfo } = section as {
				nodes: PathInfo[];
				pageInfo: { hasNextPage: boolean; endCursor: string | null };
			};

			resolvedData[ key ] = nodes.map( ( { uri, id } ) => ( {
				uri,
				id,
			} ) );

			if ( pageInfo.hasNextPage ) {
				shouldFetchMore = true;
				( newVariables[
					`hasMore${ capitalize( key ) }` as keyof VariableTypes
				] as boolean ) = true;

				( newVariables[ `${ key }Cursor` as keyof VariableTypes ] as
					| string
					| null
					| undefined ) = pageInfo.endCursor;
			} else {
				( newVariables[
					`hasMore${ capitalize( key ) }` as keyof VariableTypes
				] as boolean ) = false;
			}
		} );

		if ( shouldFetchMore ) {
			const additionalData =
				await QueryEngine.getPathsToStaticallyGenerate( newVariables );
			mergeResolvedData( resolvedData, additionalData );
		}

		return resolvedData;
	};
}
