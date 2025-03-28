import type { Metadata } from 'next';

export interface IconData {
	sourceUrl: string;
	height: string;
	width: string;
}

export interface FormattedIconData {
	url: string;
	sizes: string;
}

/**
 * Represents the Icon metadata.
 */
export interface IconMetaData {
	faviconIcons: FormattedIconData[];
	appleIcons: FormattedIconData[] | undefined;
	msApplicationTileIcon: IconData | undefined;
}

/**
 * Queries data required to generate Icons metadata for a route.
 */
export type FetchIconMetadata = () => Promise< unknown >;

/**
 * Validates and parses Icon metadata for a route into consumable state.
 *
 * @param data object to be validated and parsed
 */
export type ParseIconMetadata = ( data: unknown ) => IconMetaData;

/**
 * Options for fetching and parsing Icon metadata.
 */
export type GetIconMetadataOptions = {
	fetchMetadata: FetchIconMetadata;
	parseMetadata: ParseIconMetadata;
};

/**
 * Retrieves the Icon metadata using the provided options.
 *
 * @param options - Options for fetching and parsing Icon metadata.
 * @return A promise resolving to the Icon metadata for the route.
 */
export type GetIconMetadata = (
	options?: GetIconMetadataOptions
) => Promise< Metadata >;
