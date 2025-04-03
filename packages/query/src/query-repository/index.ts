import {
	GetCurrentTemplateDocument,
	GetGeneralSettingsDocument,
	GetGlobalStylesDocument,
} from '@graphqlTypes/graphql';
import parseTemplate from '@/utils/parse-template';
import parseGlobalStyles from '@/utils/parse-global-styles';
import {
	type GlobalHeadProps,
	type ScriptModuleProps,
	type EnqueuedScriptProps,
	type StyleSheetProps,
} from '@snapwp/core';
import parseGeneralSettings from '@/utils/parse-general-settings';
import { getConfig } from '@snapwp/core/config';
import { QueryAdapterRegistry } from '@/query-adapter-registry';
import type { BlockData } from '@snapwp/types';

/**
 * Singleton class to handle GraphQL queries using Apollo.
 */
export class QueryRepository {
	/**
	 * Fetches global styles.
	 * @return The template data fetched for the uri.
	 */
	static getGlobalStyles = async (): Promise< GlobalHeadProps > => {
		const data = await QueryAdapterRegistry.adapter.fetchQuery( {
			key: [ 'globalStyles' ],
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
		const data = await QueryAdapterRegistry.adapter.fetchQuery( {
			key: [ 'generalSettings' ],
			query: GetGeneralSettingsDocument,
		} );

		return parseGeneralSettings( data );
	};

	/**
	 * Fetches blocks, scripts and styles for the given uri.
	 * @param uri - The URL of the seed node.
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
	} > => {
		const variables = { uri };

		const data = await QueryAdapterRegistry.adapter.fetchQuery( {
			key: [ 'templateData', uri ],
			query: GetCurrentTemplateDocument,
			options: {
				variables,
			},
		} );

		const { wpHomeUrl } = getConfig();

		return parseTemplate( data, wpHomeUrl, uri );
	};
}
