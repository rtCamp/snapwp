import {
	generateRootQuery,
	IconMetadataFragFragmentDoc,
	QueryEngine,
	SiteMetadataFragFragmentDoc,
	type IconMetadataFragFragment,
	type SiteMetadataFragFragment,
} from '@snapwp/query';
import parseIconMetadata from './icons-metadata/parser';
import parseSiteMetadata from './site-metadata/parser';
import type { RootMetadataGeneratorPlugin } from './types';
import type { Metadata } from 'next';

const plugins: Record< string, RootMetadataGeneratorPlugin< unknown > > = {};

/**
 *
 * @param generator
 * @param key
 */
export function registerMetadataGenerator(
	generator: RootMetadataGeneratorPlugin< any >,
	key: string
): void {
	plugins[ key ] = generator;
}

const IconsMetaDataGenerator: RootMetadataGeneratorPlugin< IconMetadataFragFragment > =
	{
		fragmentDoc: IconMetadataFragFragmentDoc,
		parser: parseIconMetadata,
	};

const SiteMetaDataGenerator: RootMetadataGeneratorPlugin< SiteMetadataFragFragment > =
	{
		fragmentDoc: SiteMetadataFragFragmentDoc,
		parser: parseSiteMetadata,
	};

registerMetadataGenerator( IconsMetaDataGenerator, 'icon' );
registerMetadataGenerator( SiteMetaDataGenerator, 'site' );

/**
 * Fetches and parses Metadata from WordPress server
 * @param options
 * @param options.getIconsOptions
 * @param options.getSiteOptions
 * @return Metadata for RootLayout
 */
export async function getSiteMetadata(): Promise< Metadata > {
	// Collect fragments
	const fragmentDocMap = Object.fromEntries(
		Object.entries( plugins ).map( ( [ key, plugin ] ) => {
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
