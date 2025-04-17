import {
	generateRootQuery,
	generateTemplateQuery,
	IconMetadataFragFragmentDoc,
	OpenGraphMetadataFragFragmentDoc,
	QueryEngine,
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
	fragmentDoc: TFrag;
	parser: ( data: TData ) => Metadata;
	type: 'root' | 'template';
}

const defaultRootSeoPlugins = [
	{
		fragmentDoc: IconMetadataFragFragmentDoc,
		parser: iconParser,
	},
	{
		fragmentDoc: SiteMetadataFragFragmentDoc,
		parser: siteParser,
	},
];

const defaultTemplateSeoPlugins = [
	{
		fragmentDoc: OpenGraphMetadataFragFragmentDoc,
		parser: opengraphParser,
	},

	{
		fragmentDoc: TwitterMetadataFragFragmentDoc,
		parser: twitterParser,
	},

	{
		fragmentDoc: RouteMetadataFragFragmentDoc,
		parser: templateParser,
	},
];

/**
 * Handles Seo related metadata.
 */
export class Seo {
	static isInitialized: boolean = false;
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
	public static registerPlugin( plugin: MetadataPlugin< any, any > ): void {
		Seo.plugins.push( plugin );
	}

	/**
	 * Loads all default plugins.
	 */
	private static registerDefaultPlugins(): void {
		defaultRootSeoPlugins.forEach( ( plugin ) => {
			Seo.registerPlugin( { ...plugin, type: 'root' } );
		} );

		defaultTemplateSeoPlugins.forEach( ( plugin ) => {
			Seo.registerPlugin( { ...plugin, type: 'template' } );
		} );
	}

	/**
	 * Uses all loaded plugin to get site level meta data.
	 * @return metadata
	 */
	public static async getSiteMetadata(): Promise< Metadata > {
		const rootQueryFrags = Seo.plugins
			.filter( ( { type } ) => type === 'root' )
			.map( ( { fragmentDoc } ) => fragmentDoc );

		const rootQuery = generateRootQuery( rootQueryFrags );

		const { data } = await QueryEngine.apolloClient.query( {
			query: rootQuery,
			fetchPolicy: 'no-cache', // @todo figure out a caching strategy, instead of always fetching from network
			errorPolicy: 'all',
		} );

		const parsers = Seo.plugins
			.filter( ( { type } ) => type === 'root' )
			.map( ( { parser } ) => parser );

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
	 * @param {string} path sub route string
	 * @return metadata
	 */
	public static async getTemplateMetadata(
		path?: string | null
	): Promise< Metadata > {
		path = path ? '/' + path : '/';

		const renderedTemplateFrags = Seo.plugins
			.filter( ( { type } ) => type === 'template' )
			.map( ( { fragmentDoc } ) => fragmentDoc );

		const templateQuery = generateTemplateQuery( renderedTemplateFrags );

		const { data } = await QueryEngine.apolloClient.query( {
			query: templateQuery,
			fetchPolicy: 'no-cache', // @todo figure out a caching strategy, instead of always fetching from network
			errorPolicy: 'all',
			variables: {
				uri: path,
			},
		} );

		const parsers = Seo.plugins
			.filter( ( { type } ) => type === 'template' )
			.map( ( { parser } ) => parser );

		const metadataArray = parsers.map( ( parser ) =>
			parser( data.templateByUri.connectedNode )
		);

		return metadataArray.reduce(
			( acc, obj ) => Object.assign( acc, obj ),
			{}
		);
	}
}
