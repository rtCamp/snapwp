import type { Metadata } from 'next';
import type { IconsMetaData } from './icons-metadata/types';
import type { SiteMetadata } from './site-metadata/types';
import type { Fetcher, Parser, Validator } from '../types';

import fetchIcons from './icons-metadata/fetcher';
import parseIconMetadata from './icons-metadata/parser';
import validateIconMetadata from './icons-metadata/validator';

import fetchSiteMetadata from './site-metadata/fetcher';
import validateSiteMetadata from './site-metadata/validator';
import parseSiteMetadata from './site-metadata/parser';

interface RootMetadataGeneratorPlugin< TData > {
	name: string;
	fetcher: Fetcher;
	validator: Validator< TData >;
	parser: Parser< TData >;
}

const plugins: Record< string, RootMetadataGeneratorPlugin< unknown > > = {};

/**
 *
 * @param generator
 * @param key
 */
export function registerMetadataGenerator< T extends unknown >(
	generator: RootMetadataGeneratorPlugin< T >,
	key: string
): void {
	// @todo How should plugins with the same key handeled
	plugins[ key ] = generator as RootMetadataGeneratorPlugin< unknown >;
}

const IconsMetaDataGenerator: RootMetadataGeneratorPlugin< IconsMetaData > = {
	name: 'icon',
	fetcher: fetchIcons,
	validator: validateIconMetadata,
	parser: parseIconMetadata,
};

const SiteMetaDataGenerator: RootMetadataGeneratorPlugin< SiteMetadata > = {
	name: 'site',
	fetcher: fetchSiteMetadata,
	validator: validateSiteMetadata,
	parser: parseSiteMetadata,
};

const defaultMetaDataGenerators = [
	IconsMetaDataGenerator,
	SiteMetaDataGenerator,
];

registerMetadataGenerator( IconsMetaDataGenerator, 'icons' );
registerMetadataGenerator( SiteMetaDataGenerator, 'site' );

const defaultFetchedDataObject = {};
const defaultParsedDataObject = {};

/**
 * Fetches and parses Metadata from WordPress server
 * @param options
 * @param options.getIconsOptions
 * @param options.getSiteOptions
 * @return Metadata for RootLayout
 */
export async function getRootMetadata(): Promise< Metadata > {
	const keys = Object.keys( plugins );

	// @todo Better error handelling for fetching
	// Fetch data in parallel
	const fetchedData = await Promise.all(
		keys.map( async ( key ) => {
			const plugin = plugins[ key ];
			if ( ! plugin ) {
				return defaultFetchedDataObject;
			}
			return await plugin.fetcher();
		} )
	);

	// @todo Better error handelling for validation
	const validatedData = defaultMetaDataGenerators.map(
		( { validator }, ind ) => validator( fetchedData[ ind ] )
	);

	// Parse data. if parser not found or the parser throws use default object
	// @todo Better error handelling for validation
	const parsedData = defaultMetaDataGenerators.map( ( { parser }, ind ) => {
		if ( ! validatedData[ ind ] ) {
			return defaultParsedDataObject;
		}
		//@ts-ignore
		return parser( validatedData[ ind ] );
	} );

	return parsedData.reduce( ( acc, obj ) => Object.assign( acc, obj ), {} );
}
