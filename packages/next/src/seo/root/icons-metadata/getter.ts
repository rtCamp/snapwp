import { QueryEngine } from '@snapwp/query';
import type { GetIconMetadata } from '@snapwp/types';
import parseIconMetadata from './parser';

/**
 * Fetches and parses icons metadata form WP server.
 *
 * @param options - Optional functions for fetching and parsing metadata.
 * @return Parsed icons metadata.
 */
const getIcons: GetIconMetadata = async ( options ) => {
	const { fetchMetadata, parseMetadata } = options || {};
	const fetcher = fetchMetadata || QueryEngine.getGeneralSettings;
	const parser = parseMetadata || parseIconMetadata;
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
