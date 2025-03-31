import type { Validator } from '../types';
import type { FormattedIconData, IconData, IconsMetaData } from './types';

import { z } from 'zod';
/**
 * Schema for validating Icons metadata.
 */
export const IconsMetaDataSchema = z.object( {
	generalSettings: z.object( {
		siteIcon: z.object( {
			mediaItemUrl: z.string().nullable().optional(),
			mediaDetails: z.object( {
				sizes: z.array(
					z.object( {
						sourceUrl: z.string(),
						height: z.string(),
						width: z.string(),
					} )
				),
			} ),
		} ),
	} ),
} );

/**
 * Validates and parses Icon metadata for a route into consumable state.
 *
 * @param data object to be validated and parsed
 * @return Parsed Icon metadata
 */
const validateIconMetadata: Validator< IconsMetaData > = ( data ) => {
	const parsedData = IconsMetaDataSchema.safeParse( data );
	if ( ! parsedData.success || ! parsedData.data.generalSettings ) {
		return {
			faviconIcons: [],
			appleIcons: undefined,
			msApplicationTileIcon: undefined,
		};
	}

	const settings = parsedData.data;

	if ( ! settings ) {
		return {
			faviconIcons: [],
			appleIcons: undefined,
			msApplicationTileIcon: undefined,
		};
	}

	let fallbackIcons: IconsMetaData = {
		faviconIcons: [],
		appleIcons: undefined,
		msApplicationTileIcon: undefined,
	};

	// Creating fallback icons if siteIcon is present but mediaDetails is not.
	if ( settings.generalSettings.siteIcon.mediaItemUrl ) {
		fallbackIcons = {
			...fallbackIcons,
			faviconIcons: [
				{
					sizes: '512x512',
					url: settings.generalSettings.siteIcon.mediaItemUrl,
				},
			],
		};
	}

	// Return fallback icons if sizes are not present.
	if ( ! settings.generalSettings.siteIcon.mediaDetails.sizes ) {
		return fallbackIcons;
	}

	const sizes = settings.generalSettings.siteIcon.mediaDetails.sizes;

	// Filter out valid icons
	const validIcons: IconData[] = sizes.filter(
		( icon ) => !! ( icon.sourceUrl && icon.height && icon.width )
	) as IconData[];

	// Return fallback icons if no valid icons are found.
	if ( ! validIcons.length ) {
		return fallbackIcons;
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

	return {
		faviconIcons: formattedFaviconIcons,
		appleIcons: formattedAppleIcons,
		msApplicationTileIcon: findIconBySize( validIcons, '270x270' ),
	};
};

/**
 * Filter icons by multiple size formats.
 *
 * @param icons - List of all available icons.
 * @param sizes - Array of sizes in "WxH" format (e.g., "32x32").
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
 * @param icons - List of icons.
 * @param size - Size in "WxH" format (e.g., "270x270").
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
 * @param icons - List of icons.
 *
 * @return Formatted list of icons.
 */
const formatIcons = ( icons: IconData[] ): FormattedIconData[] =>
	icons.map( ( { sourceUrl, width, height } ) => ( {
		url: sourceUrl,
		sizes: `${ width }x${ height }`,
	} ) );

export default validateIconMetadata;
