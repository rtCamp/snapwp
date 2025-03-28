import type { Metadata } from 'next';

/**
 * Represents the Site metadata of a site.
 */
export type SiteMetadata = Partial< {
	siteTitle: string;
	description: string;
	locale: string;
} >;

/**
 * Options for fetching and parsing Site metadata.
 */
export type GetSiteMetadataOptions = Partial< {
	fetchMetadata: FetchSiteMetadata;
	parseMetadata: ParseSiteMetadata;
} >;

/**
 * Retrieves the Site metadata using the provided options.
 *
 * @param options - Options for fetching and parsing Site metadata.
 * @return A promise resolving to the Site metadata.
 */
export type GetSiteMetadata = (
	options?: GetSiteMetadataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate Site metadata.
 */
export type FetchSiteMetadata = () => Promise< unknown >;

/**
 * Validates and parses Site meta data into consumable state.
 */
export type ParseSiteMetadata = ( data: unknown ) => SiteMetadata;
