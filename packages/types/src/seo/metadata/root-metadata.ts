import type { Metadata } from 'next';

/**
 * Represents the root metadata of a site.
 */
export type RootMetadata = Partial< {
	siteTitle: string;
	description: string;
	locale: string;
} >;

/**
 * Options for fetching and parsing root metadata.
 */
export type GetRootMetadataOptions = Partial< {
	fetchMetadata: FetchRootMetadata;
	parseMetadata: ParseRootMetadata;
} >;

/**
 * Retrieves the root metadata using the provided options.
 *
 * @param options - Options for fetching and parsing root metadata.
 * @return A promise resolving to the root metadata.
 */
export type GetRootMetadata = (
	options?: GetRootMetadataOptions
) => Promise< Metadata >;

/**
 * Queries data required to generate root metadata.
 */
export type FetchRootMetadata = () => Promise< unknown >;

/**
 * Validates and parses root meta data into consumable state.
 */
export type ParseRootMetadata = ( data: unknown ) => RootMetadata;
