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
export class QueryEngine {
	private static instance: QueryEngine | null = null;

	/**
	 * Private constructor to prevent instantiation.
	 */
	// eslint-disable-next-line no-useless-constructor,no-empty-function -- Constructor is private to prevent instantiation.
	private constructor() {}

	/**
	 * Returns the singleton instance of QueryEngine.
	 *
	 * @throws Throws error if instance is not initialized with config.
	 * @return The QueryEngine instance.
	 */
	public static getInstance(): QueryEngine {
		if ( ! QueryEngine.instance ) {
			QueryEngine.instance = new QueryEngine();
		}
		return QueryEngine.instance;
	}

	/**
	 * Fetches global styles.
	 * @return The template data fetched for the uri.
	 */
	getGlobalStyles = async (): Promise< GlobalHeadProps > => {
		const data = await QueryAdapterRegistry.adapter.fetchQuery( {
			key: [ 'globalStyles' ],
			query: GetGlobalStylesDocument,
		} );

		// @ts-ignore
		return parseGlobalStyles( data );
	};

	/**
	 * Fetches the general settings, like favicon icon.
	 *
	 * @return General settings data.
	 */
	getGeneralSettings = async (): Promise<
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

		// @ts-ignore
		return parseGeneralSettings( data );
	};

	/**
	 * Fetches blocks, scripts and styles for the given uri.
	 * @param uri - The URL of the seed node.
	 * @return The template data fetched for the uri.
	 */
	getTemplateData = async (
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
		// @ts-ignore
		return parseTemplate( data, wpHomeUrl, uri );
	};
}
