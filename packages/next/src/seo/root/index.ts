import type { Metadata } from 'next';
import type { IconsMetaData } from './icons-metadata/types';
import type { SiteMetadata } from './site-metadata/types';
import type { RootMetadataGeneratorPlugin } from './types';

import fetchIcons from './icons-metadata/fetcher';
import parseIconMetadata from './icons-metadata/parser';
import validateIconMetadata from './icons-metadata/validator';

import fetchSiteMetadata from './site-metadata/fetcher';
import validateSiteMetadata from './site-metadata/validator';
import parseSiteMetadata from './site-metadata/parser';

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
	plugins[ key ] = generator as RootMetadataGeneratorPlugin< unknown >;
}

const IconsMetaDataGenerator: RootMetadataGeneratorPlugin< IconsMetaData > = {
	fetcher: fetchIcons,
	validator: validateIconMetadata,
	defaultValidatedObject: {
		faviconIcons: [],
		appleIcons: undefined,
		msApplicationTileIcon: undefined,
	},
	parser: parseIconMetadata,
};

const SiteMetaDataGenerator: RootMetadataGeneratorPlugin< SiteMetadata > = {
	fetcher: fetchSiteMetadata,
	validator: validateSiteMetadata,
	parser: parseSiteMetadata,
};

const DEFAULT_FETCHED_OBJECT = {};
const DEFAULT_VALIDATED_OBJECT = {};
const DEFAULT_PARSED_OBJECT = {};

registerMetadataGenerator( IconsMetaDataGenerator, 'icons' );
registerMetadataGenerator( SiteMetaDataGenerator, 'site' );

/**
 * Fetches and parses Metadata from WordPress server
 * @param options
 * @param options.getIconsOptions
 * @param options.getSiteOptions
 * @return Metadata for RootLayout
 */
export async function getRootMetadata(): Promise< Metadata > {
	const keys = Object.keys( plugins );

	// Fetch data in parallel
	const fetchedDataMap: Record< string, unknown > = Object.fromEntries(
		await Promise.all(
			keys.map( async ( key ) => {
				const plugin = plugins[ key ];
				let data;
				// Plugin not found
				if ( ! plugin ) {
					data = DEFAULT_FETCHED_OBJECT;
					return [ key, data ];
				}
				// Plugin found try fetching
				try {
					data = await plugin.fetcher();
					return [ key, data ];
				} catch {
					// Fetching failed used defaultFetchedObject
					if ( plugin.defaultFetchedObject ) {
						data = plugin.defaultFetchedObject;
					} else {
						data = DEFAULT_FETCHED_OBJECT;
					}
					// @todo add proper logging
					return [ key, data ];
				}
			} )
		)
	);
	const validatedDataMap = Object.fromEntries(
		keys.map( ( key ) => {
			const plugin = plugins[ key ];
			let data;
			// Plugin not found
			if ( ! plugin ) {
				data = DEFAULT_VALIDATED_OBJECT;
				return [ key, data ];
			}
			// Plugin found try validating
			try {
				data = plugin.validator( fetchedDataMap[ key ] );
				return [ key, data ];
			} catch {
				// Validation failed used defaultValidatedObject
				if ( plugin.defaultValidatedObject ) {
					data = plugin.defaultValidatedObject;
				} else {
					data = DEFAULT_VALIDATED_OBJECT;
				}
				// @todo add proper logging
				return [ key, data ];
			}
		} )
	);
	const parsedDataMap = Object.fromEntries(
		keys.map( ( key ) => {
			const plugin = plugins[ key ];
			let data;
			// Plugin not found
			if ( ! plugin ) {
				data = DEFAULT_PARSED_OBJECT;
				return [ key, data ];
			}
			// Plugin found try parsing
			try {
				data = plugin.parser( validatedDataMap[ key ] );
				return [ key, data ];
			} catch {
				// Parsing failed used defaultParsedObject
				if ( plugin.defaultParsedObject ) {
					data = plugin.defaultParsedObject;
				} else {
					data = DEFAULT_VALIDATED_OBJECT;
				}
				// @todo add proper logging
				return [ key, data ];
			}
		} )
	);

	return Object.values( parsedDataMap ).reduce(
		( acc, obj ) => Object.assign( acc, obj ),
		{}
	);
}
