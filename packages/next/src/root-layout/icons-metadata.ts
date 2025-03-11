import { QueryEngine } from '@snapwp/query';

interface GeneralSettingsProps {
	generalSettings?: {
		siteIcon?: {
			mediaItemUrl?: string | null;
			mediaDetails?: {
				sizes?: Array< {
					width?: string | null;
					height?: string | null;
					sourceUrl?: string | null;
				} | null > | null;
			} | null;
		} | null;
	} | null;
}

type IconMetaData = {
	faviconIcons: FormattedIconData[];
	appleIcons: FormattedIconData[];
	msApplicationTileIcon: IconData;
};

type IconData = {
	sourceUrl: string;
	height: string;
	width: string;
};

type FormattedIconData = {
	url: string;
	sizes: string;
};

/**
 * Fetch site icon data and filter them into categorized formats.
 * @see - https://developer.wordpress.org/reference/functions/wp_site_icon/#:~:text=Displays%20site%20icon%20meta%20tags. Reason why we are different resolution icons into individual category.
 *
 * @return Categorized icons.
 */
export const getIcons = async (): Promise< Partial< IconMetaData > > => {
	const settings: GeneralSettingsProps =
		await QueryEngine.getGeneralSettings();

	const sizes = settings?.generalSettings?.siteIcon?.mediaDetails?.sizes;

	// Early return if no sizes exist
	if ( ! sizes ) {
		const fallbackUrl = settings?.generalSettings?.siteIcon?.mediaItemUrl;
		return fallbackUrl
			? {
					faviconIcons: [ { sizes: '512x512', url: fallbackUrl } ],
			  }
			: {};
	}

	// Filter out valid icons
	const validIcons: IconData[] = sizes.filter(
		( icon ) => !! ( icon?.sourceUrl && icon?.height && icon?.width )
	) as IconData[];

	if ( ! validIcons.length ) {
		return {};
	}

	const filteredFaviconIcons = filterIconsBySize( validIcons, [
		'32x32',
		'192x192',
	] );
	const formattedFaviconIcons: FormattedIconData[] = filteredFaviconIcons
		? formatIcons( filteredFaviconIcons )
		: [ { url: '#', sizes: '' } ];

	const filteredAppleIcons = filterIconsBySize( validIcons, [ '180x180' ] );
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
