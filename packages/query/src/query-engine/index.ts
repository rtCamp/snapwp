import { getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGlobalStylesDocument,
	GetPagesToRenderStaticallyDocument,
	type GetPagesToRenderStaticallyQuery,
	type InputMaybe,
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

type VariableTypes = {
	first: number;
} & {
	[ K in keyof GetPagesToRenderStaticallyQuery as `${ Extract<
		K,
		string
	> }Cursor` ]: InputMaybe< string >;
};

type PathInfo = {
	uri: string;
	id: string;
};

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
	 * @param {Object} variables - The variables for the query.
	 * @return The path data to be rendered statically.
	 */
	static getStaticPaths = async (
		variables: VariableTypes = {
			first: 100,
			contentNodesCursor: null,
			termsCursor: null,
			usersCursor: null,
		}
	): Promise< Record< string, PathInfo[] > > => {
		const data = await fetchQuery( {
			name: 'GetPagesToRenderStatically',
			query: GetPagesToRenderStaticallyDocument,
			options: {
				variables: {
					...variables,
					hasMoreContentNodes: !! variables.contentNodesCursor,
					hasMoreTerms: !! variables.termsCursor,
					hasMoreUsers: !! variables.usersCursor,
				},
			},
		} );

		if ( ! data ) {
			throw new Error(
				'Error fetching pages to render statically. No data returned.'
			);
		}

		let resolvedData: Record< string, PathInfo[] > = {};

		let shouldFetchMore = false;

		const newVariables: Record< string, string > = {};

		Object.entries( data ).forEach( ( [ key, section ] ) => {
			if ( ! section ) {
				return;
			}

			const { nodes, pageInfo } = section as {
				nodes: StaticRouteNodeDataFragment[];
				pageInfo: StaticRoutePageInfoFragment;
			};

			resolvedData[ key ] = nodes
				.filter( ( { uri } ) => !! uri )
				.map( ( { uri, id } ) => ( {
					uri,
					id,
				} ) ) as PathInfo[];

			const cursorKey = `${ key }Cursor` as keyof VariableTypes;

			if ( pageInfo.hasNextPage && pageInfo.endCursor ) {
				shouldFetchMore = true;
				newVariables[ cursorKey ] = pageInfo.endCursor;
			}
		} );

		// Recursively fetch more data if there are more pages to fetch.
		if ( shouldFetchMore ) {
			const additionalData = await QueryEngine.getStaticPaths( {
				first: 100,
				...newVariables,
			} satisfies VariableTypes );

			resolvedData = {
				...resolvedData,
				...additionalData,
			};
		}

		return resolvedData;
	};
}
