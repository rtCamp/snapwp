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
import { parseIconMetadata } from './site/icons-parser';
import { parseSiteMetadata } from './site/site-parser';
import { parseRouteOpenGraphMetadata } from './template/opengraph-parser';
import { parseRouteSiteMetadata } from './template/template-parser';
import { parseRouteTwitterMetadata } from './template/twitter-parser';
import type {
	RootMetadataGeneratorPlugin,
	TemplateMetadataGeneratorPlugin,
} from './types';
import type { Metadata } from 'next';

/**
 *
 */
export class Seo {
	static isInitialized: boolean = false;
	static siteSeoPlugins: Record<
		string,
		RootMetadataGeneratorPlugin< unknown >
	> = {};

	static routeSeoPlugins: Record<
		string,
		TemplateMetadataGeneratorPlugin< unknown >
	> = {};

	/**
	 *
	 */
	public static initialize(): void {
		Seo.isInitialized = true;
		Seo.registerDefaultPlugins();
	}

	/**
	 *
	 * @param generator
	 * @param key
	 */
	public static registerSiteSeoPlugin(
		generator: RootMetadataGeneratorPlugin< any >,
		key: string
	): void {
		Seo.siteSeoPlugins[ key ] = generator;
	}

	/**
	 *
	 * @param generator
	 * @param key
	 */
	public static registerRouteSeoPlugin(
		generator: TemplateMetadataGeneratorPlugin< any >,
		key: string
	): void {
		Seo.siteSeoPlugins[ key ] = generator;
	}

	/**
	 *
	 */
	private static registerDefaultPlugins(): void {
		Seo.registerSiteSeoPlugin(
			{
				fragmentDoc: IconMetadataFragFragmentDoc,
				parser: parseIconMetadata,
			},
			'icon'
		);

		Seo.registerSiteSeoPlugin(
			{
				fragmentDoc: SiteMetadataFragFragmentDoc,
				parser: parseSiteMetadata,
			},
			'site'
		);

		Seo.registerRouteSeoPlugin(
			{
				fragmentDoc: OpenGraphMetadataFragFragmentDoc,
				parser: parseRouteOpenGraphMetadata,
			},
			'open-graph'
		);

		Seo.registerRouteSeoPlugin(
			{
				fragmentDoc: TwitterMetadataFragFragmentDoc,
				parser: parseRouteTwitterMetadata,
			},
			'twitter'
		);

		Seo.registerRouteSeoPlugin(
			{
				fragmentDoc: RouteMetadataFragFragmentDoc,
				parser: parseRouteSiteMetadata,
			},
			'site'
		);
	}

	/**
	 *
	 */
	public static async getSiteMetadata(): Promise< Metadata > {
		// Collect fragments
		const fragmentDocMap = Object.fromEntries(
			Object.entries( Seo.siteSeoPlugins ).map( ( [ key, plugin ] ) => {
				return [ key, plugin.fragmentDoc ];
			} )
		);

		// Generate Root Query
		const rootQuery = generateRootQuery( Object.values( fragmentDocMap ) );

		const { data } = await QueryEngine.apolloClient.query( {
			query: rootQuery,
		} );

		// Divide data for individual plugins
		const fetchedDataMap = Object.fromEntries(
			Object.entries( Seo.siteSeoPlugins ).map( ( [ key ] ) => {
				//@todo slice out for the respective fragment.
				return [ key, data ];
			} )
		);

		const parsedDataMap = Object.fromEntries(
			Object.entries( Seo.siteSeoPlugins ).map( ( [ key, plugin ] ) => {
				return [ key, plugin.parser( fetchedDataMap[ key ] ) ];
			} )
		);

		return Object.values( parsedDataMap ).reduce(
			( acc, obj ) => Object.assign( acc, obj ),
			{}
		);
	}

	/**
	 *
	 * @param path
	 */
	public static async getTemplateMetadata( path = '/' ): Promise< Metadata > {
		// Collect fragments
		const fragmentDocMap = Object.fromEntries(
			Object.entries( Seo.routeSeoPlugins ).map( ( [ key, plugin ] ) => {
				return [ key, plugin.fragmentDoc ];
			} )
		);

		// Generate template query
		const templateQuery = generateTemplateQuery(
			Object.values( fragmentDocMap )
		);

		const { data } = await QueryEngine.apolloClient.query( {
			query: templateQuery,
			variables: {
				uri: path,
			},
		} );

		// Divide data for individual plugins
		const fetchedDataMap = Object.fromEntries(
			Object.entries( Seo.routeSeoPlugins ).map( ( [ key ] ) => {
				//@todo slice out for the respective fragment.
				return [ key, data ];
			} )
		);

		const parsedDataMap = Object.fromEntries(
			Object.entries( Seo.routeSeoPlugins ).map( ( [ key, plugin ] ) => {
				return [ key, plugin.parser( fetchedDataMap[ key ] ) ];
			} )
		);

		return Object.values( parsedDataMap ).reduce(
			( acc, obj ) => Object.assign( acc, obj ),
			{}
		);
	}
}

if ( ! Seo.isInitialized ) {
	Seo.initialize();
}

// Rexports for simpler interface
export const getSiteMetadata = Seo.getSiteMetadata;
export const getTemplateMetadata = Seo.getTemplateMetadata;
