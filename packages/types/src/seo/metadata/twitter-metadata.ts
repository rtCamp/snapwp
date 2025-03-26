import type { Metadata } from 'next';

/**
 * Represents the Twitter metadata for a route.
 */
export type RouteTwitterMetadata = Partial< {
	title: string;
	description: string;
	image: {
		url: string;
		width?: number;
		height?: number;
	};
} >;

/**
 * Queries data required to generate Twitter metadata for a route.
 *
 * @param path Pathname of a route
 */
export type FetchRouteTwitterMetadata = ( path: string ) => Promise< unknown >;

/**
 * Validates and parses Twitter metadata for a route into consumable state.
 *
 * @param data object to be validated and parsed
 */
export type ParseRouteTwitterMetadata = (
	data: unknown
) => RouteTwitterMetadata;

/**
 * Options for fetching and parsing Twitter metadata for a route.
 */
export type GetRouteTwitterMetadataOptions = {
	fetchMetadata: FetchRouteTwitterMetadata;
	parseMetadata: ParseRouteTwitterMetadata;
};

/**
 * Retrieves the Twitter metadata for a route using the provided options.
 *
 * @param options - Options for fetching and parsing Twitter metadata.
 * @return A promise resolving to the Twitter metadata for the route.
 */
export type GetRouteTwitterMetadata = (
	path: string,
	options?: GetRouteTwitterMetadataOptions
) => Promise< Metadata >;
