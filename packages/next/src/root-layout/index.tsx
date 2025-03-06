import React, { type PropsWithChildren } from 'react';
import { QueryEngine } from '@snapwp/query';
import { GlobalHead } from './global-head';
import type { Metadata } from 'next';
import type { GeneralSettingsProps } from '@snapwp/types';

export type RootLayoutProps = {
	getGlobalStyles?: ( typeof QueryEngine )[ 'getGlobalStyles' ];
};

/**
 * The RootLayout to be used in a NextJS app.
 * @param props - The props for the renderer.
 * @param props.getGlobalStyles - A async callback to get global styles.
 * @param props.children - Child components.
 *
 * @return The rendered template
 */
export async function RootLayout( {
	getGlobalStyles = QueryEngine.getGlobalStyles,
	children,
}: PropsWithChildren< RootLayoutProps > ) {
	const globalHeadProps = await getGlobalStyles();

	return (
		<html lang="en">
			<head>
				<GlobalHead { ...globalHeadProps } />
			</head>
			{ /* suppressHydrationWarning is added to suppress warnings when classes for body are updated on the client */ }
			<body suppressHydrationWarning>{ children }</body>
		</html>
	);
}

type IconTypes = {
	faviconIcons: Icon[];
	appleIcons: Icon[];
	msApplicationTileIcon: Icon;
};

type Icon = {
	sourceUrl: string;
	height: string;
	width: string;
};

type FormattedIcon = {
	url: string;
	sizes: string;
};

/**
 * Fetch site icon data and filter them into categorized formats.
 * @see - https://developer.wordpress.org/reference/functions/wp_site_icon/#:~:text=Displays%20site%20icon%20meta%20tags. Reason why we are different resolution icons into individual category.
 *
 * @return Categorized icons.
 */
const getIcons = async (): Promise< Partial< IconTypes > > => {
	const settings: GeneralSettingsProps =
		await QueryEngine.getGeneralSettings();

	const sizes = settings?.generalSettings?.siteIcon?.mediaDetails?.sizes;

	// Early return if no sizes exist
	if ( ! sizes ) {
		const fallbackUrl = settings?.generalSettings?.siteIcon?.mediaItemUrl;
		return fallbackUrl
			? {
					faviconIcons: [
						{ width: '512', height: '512', sourceUrl: fallbackUrl },
					],
			  }
			: {};
	}

	// Filter out valid icons
	const validIcons: Icon[] = sizes.filter(
		( icon ) => !! ( icon?.sourceUrl && icon?.height && icon?.width )
	) as Icon[];

	return {
		faviconIcons: filterIconsBySize( validIcons, [ '32x32', '192x192' ] ),
		appleIcons: filterIconsBySize( validIcons, [ '180x180' ] ),
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
const filterIconsBySize = ( icons: Icon[], sizes: string[] ): Icon[] =>
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
const findIconBySize = ( icons: Icon[], size: string ): Icon | undefined =>
	icons.find( ( icon ) => `${ icon.width }x${ icon.height }` === size );

/**
 * Format icons into the required metadata structure.
 *
 * @param icons - List of icons.
 *
 * @return Formatted list of icons.
 */
const formatIcons = ( icons: Icon[] ): FormattedIcon[] =>
	icons.map( ( { sourceUrl, width, height } ) => ( {
		url: sourceUrl,
		sizes: `${ width }x${ height }`,
	} ) );

/**
 * Generate metadata for icons.
 * @see https://developer.wordpress.org/reference/functions/wp_site_icon/#:~:text=Displays%20site%20icon%20meta%20tags.
 *
 * @param icons - Object containing faviconIcons and appleIcons.
 * @param icons.faviconIcons - Favicon icons
 * @param icons.appleIcons - Apple touch icons
 *
 * @return Metadata formatted for Next.js.
 */
const generateIconsMetaData = ( {
	faviconIcons,
	appleIcons,
}: Omit<
	Partial< IconTypes >,
	'msApplicationTileIcon'
> ): Metadata[ 'icons' ] => ( {
	...( faviconIcons ? { icon: formatIcons( faviconIcons ) } : { icon: '#' } ),
	...( appleIcons ? { apple: formatIcons( appleIcons ) } : {} ),
} );

/**
 * Generate and return root metadata, including icons and other metadata.
 *
 * @return Merged metadata.
 */
export async function generateRootMetaData(): Promise< Metadata > {
	// Fetch icons in required format, apply faviconIcons and apple touch icons in icons metadata property while apply msapplication-TileImage in other metadata property
	const { faviconIcons, appleIcons, msApplicationTileIcon } =
		await getIcons();

	return {
		icons: generateIconsMetaData( { faviconIcons, appleIcons } ),
		other: {
			...( msApplicationTileIcon && {
				'msapplication-TileImage': msApplicationTileIcon.sourceUrl,
			} ),
		},
	};
}
