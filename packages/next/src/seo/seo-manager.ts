import { hasKey, Logger } from '@snapwp/core';
import {
	fetchQuery,
	generateRootQuery,
	generateTemplateQuery,
	IconMetadataFragFragmentDoc,
	OpenGraphMetadataFragFragmentDoc,
	RouteMetadataFragFragmentDoc,
	SiteMetadataFragFragmentDoc,
	TwitterMetadataFragFragmentDoc,
} from '@snapwp/query';

import { parseGeneralSettings as iconParser } from './parsers/icons-parser';
import { parseNode as opengraphParser } from './parsers/opengraph-parser';
import { parseGeneralSettings as siteParser } from './parsers/site-parser';

import { parseNode as templateParser } from './parsers/template-parser';
import { parseNode as twitterParser } from './parsers/twitter-parser';

import type { Metadata } from 'next';

export type MetadataParser< T > = ( data: T ) => Metadata;

export interface MetadataPlugin< TFrag, TData > {
	fragment: TFrag;
	parseMetadata: ( data: TData ) => Metadata;
	location: 'layout' | 'page';
}

const defaultRootSeoPlugins = [
	{
		fragment: IconMetadataFragFragmentDoc,
		parseMetadata: iconParser,
	},
	{
		fragment: SiteMetadataFragFragmentDoc,
		parseMetadata: siteParser,
	},
];

const defaultTemplateSeoPlugins = [
	{
		fragment: OpenGraphMetadataFragFragmentDoc,
		parseMetadata: opengraphParser,
	},

	{
		fragment: TwitterMetadataFragFragmentDoc,
		parseMetadata: twitterParser,
	},

	{
		fragment: RouteMetadataFragFragmentDoc,
		parseMetadata: templateParser,
	},
];

/**
 * Handles Seo related metadata.
 */
export class Seo {
	static isInitialized: boolean = false;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- allow any plugin to be registered.
	static plugins: MetadataPlugin< any, any >[] = [];

	/**
	 * Initializer
	 */
	public static initialize(): void {
		Seo.isInitialized = true;
		Seo.registerDefaultPlugins();
	}

	/**
	 * Loads a plugin to generate route level meta data.
	 * @param {RootMetadataGeneratorPlugin< any >} plugin Plugin object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- allow any plugin to be registered.
	public static registerPlugin( plugin: MetadataPlugin< any, any > ): void {
		Seo.plugins.push( plugin );
	}

	/**
	 * Loads all default plugins.
	 */
	private static registerDefaultPlugins(): void {
		defaultRootSeoPlugins.forEach( ( plugin ) => {
			Seo.registerPlugin( { ...plugin, location: 'layout' } );
		} );

		defaultTemplateSeoPlugins.forEach( ( plugin ) => {
			Seo.registerPlugin( { ...plugin, location: 'page' } );
		} );
	}

	/**
	 * Uses all loaded plugin to get site level meta data.
	 * @return metadata
	 */
	public static async getLayoutMetadata(): Promise< Metadata > {
		const rootQueryFrags = Seo.plugins
			.filter( ( { location } ) => location === 'layout' )
			.map( ( { fragment } ) => fragment );

		const rootQuery = generateRootQuery( rootQueryFrags );

		const data = await fetchQuery( {
			name: 'layout-metadata-query',
			query: rootQuery,
		} );

		if ( ! hasKey( data, 'generalSettings' ) ) {
			Logger.error(
				'Error fetching layout metadata. General Settings is missing in response'
			);
			return {};
		}

		const parsers = Seo.plugins
			.filter( ( { location } ) => location === 'layout' )
			.map( ( { parseMetadata } ) => parseMetadata );
		const metadataArray = parsers.map( ( parser ) =>
			parser( data.generalSettings )
		);

		return metadataArray.reduce(
			( acc, obj ) => Object.assign( acc, obj ),
			{}
		);
	}

	/**
	 * Uses all loaded plugin to get route level meta data.
	 * @todo add params and searchParams
	 * @param {string} uri sub route string
	 * @return metadata
	 */
	public static async getPageMetadata(
		uri?: string | null
	): Promise< Metadata > {
		uri = uri ? '/' + uri : '/';

		const renderedTemplateFrags = Seo.plugins
			.filter( ( { location } ) => location === 'page' )
			.map( ( { fragment } ) => fragment );

		const templateQuery = generateTemplateQuery( renderedTemplateFrags );

		const data = await fetchQuery( {
			name: 'page-metadata-query',
			query: templateQuery,
			options: {
				variables: {
					uri,
				},
			},
		} );

		if ( ! hasKey( data, 'templateByUri' ) ) {
			Logger.error(
				'Error fetching page metadata. RenderedTemplate missing in response'
			);
			return {};
		}

		const template = data.templateByUri;

		if ( ! hasKey( template, 'connectedNode' ) ) {
			Logger.error(
				'Error fetching page metadata. ConnectedNode missing in response'
			);
			return {};
		}
		const parsers = Seo.plugins
			.filter( ( { location } ) => location === 'page' )
			.map( ( { parseMetadata } ) => parseMetadata );

		const metadataArray = parsers.map( ( parser ) =>
			parser( template.connectedNode )
		);

		return metadataArray.reduce(
			( acc, obj ) => Object.assign( acc, obj ),
			{}
		);
	}
}
