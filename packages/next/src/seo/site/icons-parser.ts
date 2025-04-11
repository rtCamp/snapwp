import type { Parser } from '../types';
import type { IconMetadataFragFragment } from '@snapwp/query';
import type { Metadata } from 'next';

//@todo simplify parser

/**
 * Validates and parses Icon metadata for a route into consumable state.
 *
 * @param {IconMetadataFragFragment} data object to be validated and parsed
 * @return Parsed Icon metadata
 */
export const parseIconMetadata: Parser< IconMetadataFragFragment > = (
	data
) => {
	let fallbackIcons: IconsMetaData = {
		faviconIcons: [],
		appleIcons: undefined,
		msApplicationTileIcon: undefined,
	};

	if ( ! data.generalSettings ) {
		return reshape( fallbackIcons );
	}

	if ( ! data.generalSettings.siteIcon ) {
		return reshape( fallbackIcons );
	}

	// Creating fallback icons if siteIcon is present but mediaDetails is not.
	if ( data.generalSettings.siteIcon.mediaItemUrl ) {
		fallbackIcons = {
			...fallbackIcons,
			faviconIcons: [
				{
					sizes: '512x512',
					url: data.generalSettings.siteIcon.mediaItemUrl,
				},
			],
		};
	}

	if ( ! data.generalSettings.siteIcon.mediaDetails?.sizes ) {
		return reshape( fallbackIcons );
	}

	const sizes = data.generalSettings.siteIcon.mediaDetails.sizes;

	// Filter out valid icons
	const validIcons: IconData[] = sizes.filter(
		( icon ) => !! ( icon?.sourceUrl && icon.height && icon.width )
	) as IconData[];

	// Return fallback icons if no valid icons are found.
	if ( ! validIcons.length ) {
		return reshape( fallbackIcons );
	}

	// Filter icons by sizes.
	const filteredFaviconIcons = filterIconsBySize( validIcons, [
		'32x32',
		'192x192',
	] );

	// Format icons into required metadata structure. If filteredFaviconIcons is empty, return # as url of icon.
	const formattedFaviconIcons: FormattedIconData[] = filteredFaviconIcons
		? formatIcons( filteredFaviconIcons )
		: [ { url: '#', sizes: '' } ];

	const filteredAppleIcons = filterIconsBySize( validIcons, [ '180x180' ] );

	// Format icons into required metadata structure.
	const formattedAppleIcons: FormattedIconData[] = filteredAppleIcons
		? formatIcons( filteredAppleIcons )
		: [];

	return reshape( {
		faviconIcons: formattedFaviconIcons,
		appleIcons: formattedAppleIcons,
		msApplicationTileIcon: findIconBySize( validIcons, '270x270' ),
	} );
};

/**
 *
 * @param {IconsMetaData} data Meta data in the internal format
 * @return Meta data consumable by next
 */
const reshape = ( data: IconsMetaData ): Metadata => {
	return {
		icons: {
			icon: data.faviconIcons,
			apple: data.appleIcons,
		},
		other: {
			...( data.msApplicationTileIcon && {
				'msapplication-TileImage': data.msApplicationTileIcon.sourceUrl,
			} ),
		},
	};
};

/**
 * Filter icons by multiple size formats.
 *
 * @param {Array<IconData>} icons - List of all available icons.
 * @param {Array<string>} sizes - Array of sizes in "WxH" format (e.g., "32x32").
 * @return Filtered list of icons.
 */
export const filterIconsBySize = (
	icons: IconData[],
	sizes: string[]
): IconData[] =>
	icons.filter( ( icon ) =>
		sizes.includes( `${ icon.width }x${ icon.height }` )
	);

/**
 * Find a single icon matching the specified size.
 *
 * @param {Array<IconData>} icons - List of icons.
 * @param {Array<string>} size - Size in "WxH" format (e.g., "270x270").
 * @return The first matching icon or undefined.
 */
export const findIconBySize = (
	icons: IconData[],
	size: string
): IconData | undefined =>
	icons.find( ( icon ) => `${ icon.width }x${ icon.height }` === size );

/**
 * Format icons into the required metadata structure.
 *
 * @param {Array<IconData>} icons - List of icons.
 *
 * @return Formatted list of icons.
 */
const formatIcons = ( icons: IconData[] ): FormattedIconData[] =>
	icons.map( ( { sourceUrl, width, height } ) => ( {
		url: sourceUrl,
		sizes: `${ width }x${ height }`,
	} ) );

export interface IconsMetaData {
	faviconIcons: FormattedIconData[];
	appleIcons: FormattedIconData[] | undefined;
	msApplicationTileIcon: IconData | undefined;
}

export interface IconData {
	sourceUrl: string;
	height: string;
	width: string;
}

export interface FormattedIconData {
	url: string;
	sizes: string;
}
