import type { Metadata } from 'next';
import type { TemplateMetadataGeneratorPlugin } from './types';

import parseRouteOpenGraphMetadata from './opengraph-metadata/parser';

import parseRouteTwitterMetadata from './twitter-metadata/parser';
import parseRouteSiteMetadata from './site-metadata/parser';
import {
	generateTemplateQuery,
	OpenGraphMetadataFragFragmentDoc,
	QueryEngine,
	RouteMetadataFragFragmentDoc,
	TwitterMetadataFragFragmentDoc,
	type OpenGraphMetadataFragFragment,
	type RouteMetadataFragFragment,
	type TwitterMetadataFragFragment,
} from '@snapwp/query';

const plugins: Record<
	string,
	TemplateMetadataGeneratorPlugin< unknown >
> = {};

/**
 *
 * @param generator
 * @param key
 */
export function registerMetadataGenerator(
	generator: TemplateMetadataGeneratorPlugin< any >,
	key: string
): void {
	plugins[ key ] = generator;
}

const OpenGraphMetaDataGenerator: TemplateMetadataGeneratorPlugin< OpenGraphMetadataFragFragment > =
	{
		fragmentDoc: OpenGraphMetadataFragFragmentDoc,
		parser: parseRouteOpenGraphMetadata,
	};

const TwitterMetaDataGenerator: TemplateMetadataGeneratorPlugin< TwitterMetadataFragFragment > =
	{
		fragmentDoc: TwitterMetadataFragFragmentDoc,
		parser: parseRouteTwitterMetadata,
	};

const SiteMetaDataGenerator: TemplateMetadataGeneratorPlugin< RouteMetadataFragFragment > =
	{
		fragmentDoc: RouteMetadataFragFragmentDoc,
		parser: parseRouteSiteMetadata,
	};

registerMetadataGenerator( OpenGraphMetaDataGenerator, 'open-graph' );
registerMetadataGenerator( TwitterMetaDataGenerator, 'twitter' );
registerMetadataGenerator( SiteMetaDataGenerator, 'site' );

/**
 * Fetches and parses Metadata from WordPress server
 * @param path
 * @param options
 * @param options.getRouteOpenGraphMetadataOptions
 * @param options.getRouteTwitterMetadataOptions
 * @param options.getSiteRouteMetadataOptions
 * @return Metadata for RootLayout
 */
export async function getRouteMetadata( path = '/' ): Promise< Metadata > {
	// Collect fragments
	const fragmentDocMap = Object.fromEntries(
		Object.entries( plugins ).map( ( [ key, plugin ] ) => {
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
		Object.entries( plugins ).map( ( [ key ] ) => {
			//@todo slice out for the respective fragment.
			return [ key, data ];
		} )
	);

	const parsedDataMap = Object.fromEntries(
		Object.entries( plugins ).map( ( [ key, plugin ] ) => {
			return [ key, plugin.parser( fetchedDataMap[ key ] ) ];
		} )
	);

	return Object.values( parsedDataMap ).reduce(
		( acc, obj ) => Object.assign( acc, obj ),
		{}
	);
}
