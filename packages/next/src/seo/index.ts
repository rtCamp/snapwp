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
 * Handles Seo related metadata.
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
	 * Initializer
	 */
	public static initialize(): void {
		Seo.isInitialized = true;
		Seo.registerDefaultPlugins();
	}

	/**
	 * Loads a plugin to generate site level meta data.
	 * @param {RootMetadataGeneratorPlugin< any >} plugin Plugin object
	 * @param {string} key key unique to the plugin
	 */
	public static registerSiteSeoPlugin(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- No contraints on the fragment
		plugin: RootMetadataGeneratorPlugin< any >,
		key: string
	): void {
		Seo.siteSeoPlugins[ key ] = plugin;
	}

	/**
	 * Loads a plugin to generate route level meta data.
	 * @param {RootMetadataGeneratorPlugin< any >} plugin Plugin object
	 * @param {string} key key unique to the plugin
	 */
	public static registerRouteSeoPlugin(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- No contraints on the fragment
		plugin: TemplateMetadataGeneratorPlugin< any >,
		key: string
	): void {
		Seo.routeSeoPlugins[ key ] = plugin;
	}

	/**
	 * Loads all default plugins.
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
	 * Uses all loaded plugin to get site level meta data.
	 * @return metadata
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
			fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
			errorPolicy: 'all',
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
	 * Uses all loaded plugin to get route level meta data.
	 * @todo add params and searchParams
	 * @param {string} path sub route string
	 * @return metadata
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
			fetchPolicy: 'network-only', // @todo figure out a caching strategy, instead of always fetching from network
			errorPolicy: 'all',
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

//@todo attach initialization to lifecycle of the app rather than import
if ( ! Seo.isInitialized ) {
	try {
		Seo.initialize();
	} catch ( error ) {}
}

// Rexports for simpler interface
export const getSiteMetadata = Seo.getSiteMetadata;
export const getTemplateMetadata = Seo.getTemplateMetadata;
