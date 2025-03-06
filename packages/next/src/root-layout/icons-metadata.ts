import type {
	GeneralSettingsProps,
	FormattedIcon,
	Icon,
	IconTypes,
} from '@snapwp/types';
import { QueryEngine } from '@snapwp/query';

/**
 * Fetch site icon data and filter them into categorized formats.
 * @see - https://developer.wordpress.org/reference/functions/wp_site_icon/#:~:text=Displays%20site%20icon%20meta%20tags. Reason why we are different resolution icons into individual category.
 *
 * @return Categorized icons.
 */
export const getIcons = async (): Promise< Partial< IconTypes > > => {
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
	const validIcons: Icon[] = sizes.filter(
		( icon ) => !! ( icon?.sourceUrl && icon?.height && icon?.width )
	) as Icon[];

	if ( ! validIcons.length ) {
		return {};
	}

	const filteredFaviconIcons = filterIconsBySize( validIcons, [
		'32x32',
		'192x192',
	] );
	const formattedFaviconIcons: FormattedIcon[] = filteredFaviconIcons
		? formatIcons( filteredFaviconIcons )
		: [ { url: '#', sizes: '' } ];

	const filteredAppleIcons = filterIconsBySize( validIcons, [ '180x180' ] );
	const formattedAppleIcons: FormattedIcon[] = filteredAppleIcons
		? formatIcons( filteredFaviconIcons )
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
export const filterIconsBySize = ( icons: Icon[], sizes: string[] ): Icon[] =>
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
	icons: Icon[],
	size: string
): Icon | undefined =>
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
