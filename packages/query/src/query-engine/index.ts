import {
	type EnqueuedScriptProps,
	type GlobalHeadProps,
	type ScriptModuleProps,
	type StyleSheetProps,
} from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGlobalStylesDocument,
	GetPagesToRenderStaticallyDocument,
	type GetPagesToRenderStaticallyQuery,
} from '@graphqlTypes/graphql';

import { fetchQuery } from '@/query-engine/registry';
import { parseQueryResult as parseGlobalStyles } from '@/utils/parse-global-styles';
import { parseQueryResult as parseTemplate } from '@/utils/parse-template';

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
	 * Fetches pages to be rendered statically.
	 *
	 * @return The pages to be rendered statically.
	 */
	static getPaths = async (): Promise< Paths > => {
		const first = 100;
		const contentNodes: Paths[ 'contentNodes' ] = [];
		const terms: Paths[ 'terms' ] = [];
		const users: Paths[ 'users' ] = [];

		let contentNodeCursor: string | null | undefined = null;
		let termCursor: string | null | undefined = null;
		let userCursor: string | null | undefined = null;

		let hasMoreContentNodes = true;
		let hasMoreTerms = true;
		let hasMoreUsers = true;

		do {
			const data: GetPagesToRenderStaticallyQuery = await fetchQuery( {
				name: 'GetPagesToRenderStatically',
				query: GetPagesToRenderStaticallyDocument,
				options: {
					// @ts-ignore
					variables: {
						first,
						hasMoreContentNodes,
						hasMoreTerms,
						hasMoreUsers,
						contentNodeCursor,
						termCursor,
						userCursor,
					},
				},
			} );

			if ( ! data ) {
				throw new Error(
					'Error fetching pages to render statically. No data returned.'
				);
			}

			if ( data.contentNodes ) {
				contentNodes.push( ...data.contentNodes.nodes );
				hasMoreContentNodes = data.contentNodes.pageInfo.hasNextPage;
				contentNodeCursor = data.contentNodes.pageInfo.endCursor;
			} else {
				hasMoreContentNodes = false;
			}

			if ( data.terms ) {
				terms.push( ...data.terms.nodes );
				hasMoreTerms = data.terms.pageInfo.hasNextPage;
				termCursor = data.terms.pageInfo.endCursor;
			} else {
				hasMoreTerms = false;
			}

			if ( data.users ) {
				users.push( ...data.users.nodes );
				hasMoreUsers = data.users.pageInfo.hasNextPage;
				userCursor = data.users.pageInfo.endCursor;
			} else {
				hasMoreUsers = false;
			}
		} while ( hasMoreContentNodes || hasMoreTerms || hasMoreUsers );

		return {
			contentNodes,
			terms,
			users,
		};
	};
}

type PathInfo = {
	uri?: string | null;
	id: string;
};

export type Paths = {
	contentNodes?: PathInfo[];
	terms?: PathInfo[];
	users?: PathInfo[];
	[ key: string ]: PathInfo[] | undefined;
};
