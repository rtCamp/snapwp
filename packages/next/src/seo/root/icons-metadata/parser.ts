import type { Parser } from '../types';
import type { IconsMetaData } from './types';

/**
 * Validates and parses Icon metadata for a route into consumable state.
 *
 * @param data object to be validated and parsed
 * @return Parsed Icon metadata
 */
const parseIconMetadata: Parser< IconsMetaData > = ( data ) => {
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

export default parseIconMetadata;
