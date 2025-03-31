import type { Metadata } from 'next';
import type { OpenGraphMetadata } from './opengraph-metadata/types';
import type { TwitterMetadata } from './twitter-metadata/types';
import type { SiteMetadata } from './site-metadata/types';
import type { RouteMetadataGeneratorPlugin } from './types';

import fetchRouteOpenGraphMetadata from './opengraph-metadata/fetcher';
import validateRouteOpenGraphMetadata from './opengraph-metadata/validator';
import parseRouteOpenGraphMetadata from './opengraph-metadata/parser';

import fetchRouteTwitterMetadata from './twitter-metadata/fetcher';
import validateRouteTwitterMetadata from './twitter-metadata/validator';
import parseRouteTwitterMetadata from './twitter-metadata/parsera';
import fetchRouteSiteMetadata from './site-metadata/fetcher';
import parseRouteSiteMetadata from './site-metadata/parser';
import validateRouteSiteMetadata from './site-metadata/validator';

const plugins: Record< string, RouteMetadataGeneratorPlugin< unknown > > = {};

/**
 *
 * @param generator
 * @param key
 */
export function registerMetadataGenerator< T extends unknown >(
	generator: RouteMetadataGeneratorPlugin< T >,
	key: string
): void {
	plugins[ key ] = generator as RouteMetadataGeneratorPlugin< unknown >;
}

const OpenGraphMetaDataGenerator: RouteMetadataGeneratorPlugin< OpenGraphMetadata > =
	{
		fetcher: fetchRouteOpenGraphMetadata,
		validator: validateRouteOpenGraphMetadata,
		parser: parseRouteOpenGraphMetadata,
	};

const TwitterMetaDataGenerator: RouteMetadataGeneratorPlugin< TwitterMetadata > =
	{
		fetcher: fetchRouteTwitterMetadata,
		validator: validateRouteTwitterMetadata,
		parser: parseRouteTwitterMetadata,
	};

const SiteMetaDataGenerator: RouteMetadataGeneratorPlugin< SiteMetadata > = {
	fetcher: fetchRouteSiteMetadata,
	validator: validateRouteSiteMetadata,
	parser: parseRouteSiteMetadata,
};

const DEFAULT_FETCHED_OBJECT = {};
const DEFAULT_VALIDATED_OBJECT = {};
const DEFAULT_PARSED_OBJECT = {};

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
					data = await plugin.fetcher( path );
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
				data = plugin.validator( path, fetchedDataMap[ key ] );
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
				data = plugin.parser( path, validatedDataMap[ key ] );
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
