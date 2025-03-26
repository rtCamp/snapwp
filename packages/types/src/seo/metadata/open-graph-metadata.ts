import type { Metadata } from 'next';

/**
 * Represents the Open Graph metadata for a route.
 */
export type RouteOpenGraphMetadata = Partial< {
	title: string;
	url: string;
	type: 'article' | 'website';
	images?: {
		url: string;
		width?: number;
		height?: number;
	}[];
	description: string;
	publishedTime: string;
	modifiedTime: string;
} >;

/**
 * Options for fetching and parsing Open Graph metadata for a route.
 */
export type GetRouteOpenGraphMetadataOptions = Partial< {
	fetchMetadata: FetchRouteOpenGraphMetadata;
	parseMetadata: ParseRouteOpenGraphMetadata;
} >;

/**
 * Retrieves the Open Graph metadata for a route using the provided options.
 *
 * @param options - Options for fetching and parsing route metadata.
 * @return A promise resolving to the route metadata.
 */
export type GetRouteOpenGraphMetadata = (
	path: string,
	options?: GetRouteOpenGraphMetadataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate Open Graph metadata.
 *
 * @param path Pathname of a route
 */
export type FetchRouteOpenGraphMetadata = (
	path: string
) => Promise< unknown >;

/**
 * Validates and parses Open Graph data into consumable state.
 *
 * @param path Pathname of a route
 * @param data object to be validated and parsed
 */
export type ParseRouteOpenGraphMetadata = (
	path: string,
	data: unknown
) => RouteOpenGraphMetadata;
