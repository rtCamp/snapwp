import {
	type EnqueuedScriptProps,
	type GlobalHeadProps,
	type ScriptModuleProps,
	type StyleSheetProps,
} from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import {
	GetCurrentTemplateDocument,
	GetGeneralSettingsDocument,
	GetGlobalStylesDocument,
} from '@graphqlTypes/graphql';

import { fetchQuery } from '@/query-engine/registry';
import { parseGeneralSettings } from '@/utils/parse-general-settings';
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
			options: {},
		} );

		return parseGlobalStyles( data );
	};

	/**
	 * Fetches the general settings, like favicon icon.
	 *
	 * @return General settings data.
	 */
	static getGeneralSettings = async (): Promise<
		| {
				generalSettings: {
					siteIcon: {
						mediaItemUrl: string | undefined;
						mediaDetails: {
							sizes: {
								sourceUrl: string;
								height: string;
								width: string;
							}[];
						};
					};
				};
		  }
		| undefined
	> => {
		const data = await fetchQuery( {
			name: 'GetGeneralSettings',
			query: GetGeneralSettingsDocument,
		} );

		return parseGeneralSettings( data );
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
}
