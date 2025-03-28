import type { Metadata } from 'next';
import getIcons from './icons-metadata/getter';
import getSiteMetadata from './site-metadata/getter';
import type { GetterOptions } from './type';
import type { IconsMetaData } from './icons-metadata/types';
import type { SiteMetadata } from './site-metadata/types';

/**
 * Fetches and parses Metadata from WordPress server
 * @param options
 * @param options.getIconsOptions
 * @param options.getSiteOptions
 * @return Metadata for RootLayout
 */
export async function getRootMetadata( options?: {
	getIconsOptions?: GetterOptions< IconsMetaData >;
	getSiteOptions?: GetterOptions< SiteMetadata >;
} ): Promise< Metadata > {
	const iconsMetaData = await getIcons( options?.getIconsOptions );
	const siteMetaData = await getSiteMetadata( options?.getSiteOptions );

	return {
		...iconsMetaData,
		...siteMetaData,
	};
}
