/**
 * Represents the metadata for a route.
 */
export type SiteRouteMetadata = Partial< {
	title: string;
	description: string;
	authors: { name: string }[];
	image: {
		url?: string;
		width?: number;
		height?: number;
	};
} >;

/**
 * Options for fetching and parsing the metadata for a route.
 */
export type GetSiteRouteMetadataOptions = {
	fetchMetadata?: FetchSiteRouteMetadata;
	parseMetadata?: ParseSiteRouteMetadata;
};

/**
 * Retrieves the metadata for a route using the provided options.
 *
 * @param options - Options for fetching and parsing the metadata.
 * @return A promise resolving to the metadata for the route.
 */
export type GetSiteRouteMetadata = (
	path: string,
	options?: GetSiteRouteMetadataOptions
) => Promise< SiteRouteMetadata >;

/**
 * Queries data required to generate metadata for a route.
 *
 * @param path Pathname of a route
 */
export type FetchSiteRouteMetadata = ( path: string ) => Promise< unknown >;

/**
 * Validates and parses metadata for a route into consumable state.
 *
 * @param data object to be validated and parsed
 */
export type ParseSiteRouteMetadata = ( data: unknown ) => SiteRouteMetadata;
