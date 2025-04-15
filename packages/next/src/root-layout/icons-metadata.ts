import { QueryEngine } from '@snapwp/query';

interface GeneralSettingsProps {
	generalSettings: {
		siteIcon: {
			mediaItemUrl: string | undefined;
			mediaDetails: {
				sizes: IconData[];
			};
		};
	};
}

interface IconMetaData {
	faviconIcons: FormattedIconData[];
	appleIcons: FormattedIconData[] | undefined;
	msApplicationTileIcon: IconData | undefined;
}

interface IconData {
	sourceUrl: string;
	height: string;
	width: string;
}

interface FormattedIconData {
	url: string;
	sizes: string;
}

/**
 * Fetch site icon data and filter them into categorized formats.
 * @see - https://developer.wordpress.org/reference/functions/wp_site_icon/#:~:text=Displays%20site%20icon%20meta%20tags. Reason why we are different resolution icons into individual category.
 *
 * @todo Refactor for composability alongside SEO metadata patterns
 *
 * @return Categorized icons.
 */
export const getIcons = async (): Promise< IconMetaData > => {
	const settings: GeneralSettingsProps | undefined =
		await QueryEngine.getGeneralSettings();

	let fallbackIcons: IconMetaData = {
		faviconIcons: [ { url: '#', sizes: '' } ],
		appleIcons: undefined,
		msApplicationTileIcon: undefined,
	};

	if ( ! settings ) {
		return fallbackIcons;
	}

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
