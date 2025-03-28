import type { Metadata } from 'next';
import getIcons from './icons-metadata/getter';
import getSiteMetadata from './site-metadata/getter';
import type {
	GetIconMetadataOptions,
	GetSiteMetadataOptions,
} from '@snapwp/types';

/**
 * Fetches and parses Metadata from WordPress server
 * @param options
 * @param options.getIconsOptions
 * @param options.getSiteOptions
 * @return Metadata for RootLayout
 */
export async function getRootMetadata( options?: {
	getIconsOptions?: GetIconMetadataOptions;
	getSiteOptions?: GetSiteMetadataOptions;
} ): Promise< Metadata > {
	const iconsMetaData = await getIcons( options?.getIconsOptions );
	const siteMetaData = await getSiteMetadata( options?.getSiteOptions );

	return {
		...iconsMetaData,
		...siteMetaData,
	};
}
