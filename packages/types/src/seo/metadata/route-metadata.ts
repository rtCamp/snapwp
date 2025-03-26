import type { Metadata } from 'next';
import type {
	GetRouteOpenGraphMetadataOptions,
	RouteOpenGraphMetadata,
} from './open-graph-metadata';
import type {
	GetRouteTwitterMetadataOptions,
	RouteTwitterMetadata,
} from './twitter-metadata';

/**
 * Represents the metadata for a route.
 */
export type RouteMetadata = Partial<
	RouteOpenGraphMetadata &
		RouteTwitterMetadata & {
			authors: { name: string }[];
		}
>;

/**
 * Options for fetching and parsing the metadata for a route.
 */
export type GetRouteMetadataOptions = {
	getRouteOpenGraphMetadataOptions: GetRouteOpenGraphMetadataOptions;
	getRouteTwitterMetadataOptions: GetRouteTwitterMetadataOptions;
	fetchMetadata?: FetchRouteMetadata;
	parseMetadata?: ParseRouteMetadata;
};

/**
 * Retrieves the metadata for a route using the provided options.
 *
 * @param options - Options for fetching and parsing the metadata.
 * @return A promise resolving to the metadata for the route.
 */
export type GetRouteMetadata = (
	path: string,
	options?: GetRouteMetadataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate metadata for a route.
 *
 * @param path Pathname of a route
 */
export type FetchRouteMetadata = ( path: string ) => Promise< unknown >;

/**
 * Validates and parses metadata for a route into consumable state.
 *
 * @param data object to be validated and parsed
 */
export type ParseRouteMetadata = ( data: unknown ) => RouteMetadata;
