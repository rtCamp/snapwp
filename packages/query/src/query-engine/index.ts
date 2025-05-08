import { getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGlobalStylesDocument,
	GetPagesToRenderStaticallyDocument,
	type GetPagesToRenderStaticallyQuery,
	type GetPagesToRenderStaticallyQueryVariables,
	type StaticRouteNodeDataFragment,
	type StaticRoutePageInfoFragment,
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
	 * Fetches paths to be rendered statically.
	 *
	 * @param {GetPagesToRenderStaticallyQueryVariables} variables - The variables for the query.
	 * @return The path data to be rendered statically.
	 */
	static getStaticPaths = async (
		variables: GetPagesToRenderStaticallyQueryVariables = {}
	): Promise< string[] > => {
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

		const resolvedData: string[] = [];
		let shouldFetchMore = false;
		const newVariables = {
			...variables,
		};

		Object.entries( data ).forEach( ( [ key, section ] ) => {
			if ( ! section ) {
				return;
			}

			// Here we know for sure that the key which is string is a key of GetPagesToRenderStaticallyQuery so it's safe to cast it.
			const resolvedKey = key as keyof GetPagesToRenderStaticallyQuery;

			const { nodes, pageInfo } = section as {
				nodes: StaticRouteNodeDataFragment[];
				pageInfo: StaticRoutePageInfoFragment;
			};

			resolvedData.push(
				...nodes
					.filter( ( { uri } ) => !! uri )
					.map( ( { uri } ) => uri! )
			);

			const cursorKey =
				`${ resolvedKey }Cursor` satisfies keyof GetPagesToRenderStaticallyQueryVariables;
			const hasMoreKey = `hasMore${ capitalize(
				resolvedKey
			) }` satisfies keyof GetPagesToRenderStaticallyQueryVariables;

			if ( pageInfo.hasNextPage && pageInfo.endCursor ) {
				shouldFetchMore = true;
				newVariables[ cursorKey ] = pageInfo.endCursor;
				newVariables[ hasMoreKey ] = true;
			} else {
				newVariables[ cursorKey ] = null;
				newVariables[ hasMoreKey ] = false;
			}
		} );

		// Recursively fetch more data if there are more pages to fetch.
		if ( shouldFetchMore ) {
			const additionalData = await QueryEngine.getStaticPaths( {
				first: 100,
				...newVariables,
			} );

			resolvedData.push( ...additionalData );
		}

		return resolvedData;
	};
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {T} key - The string to capitalize.
 *
 * @return {Capitalize< T >} - The capitalized string.
 */
function capitalize< T extends string >( key: T ): Capitalize< T > {
	return ( key.charAt( 0 ).toUpperCase() +
		key.slice( 1 ) ) as Capitalize< T >;
}
