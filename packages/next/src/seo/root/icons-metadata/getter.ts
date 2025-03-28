import { QueryEngine } from '@snapwp/query';
import type { IconsMetaData } from './types';
import parseIconMetadata from './parser';
import type { Getter } from '../type';

/**
 * Retrieves the Icon metadata using the provided options.
 *
 * @param options - Options for fetching and parsing Icon metadata.
 * @return A promise resolving to the Icon metadata for the route.
 */
const getIcons: Getter< IconsMetaData > = async ( options = {} ) => {
	const {
		fetcher = QueryEngine.getGeneralSettings,
		parser = parseIconMetadata,
	} = options;

	const metadata = await fetcher();
	const { faviconIcons, appleIcons, msApplicationTileIcon } =
		parser( metadata );
	return {
		icons: {
			icon: faviconIcons,
			apple: appleIcons,
		},
		other: {
			...( msApplicationTileIcon && {
				'msapplication-TileImage': msApplicationTileIcon.sourceUrl,
			} ),
		},
	};
};

export default getIcons;
