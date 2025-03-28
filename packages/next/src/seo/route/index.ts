import type { Metadata } from 'next';
import type {
	GetRouteOpenGraphMetadataOptions,
	GetRouteTwitterMetadataOptions,
	GetSiteRouteMetadataOptions,
} from '@snapwp/types';
import getRouteOpenGraphMetadata from './opengraph-metadata/getter';
import getRouteTwitterMetadata from './twitter-metadata/getter';
import getSiteMetadata from './site-metadata/getter';

/**
 * Fetches and parses Metadata from WordPress server
 * @param path
 * @param options
 * @param options.getRouteOpenGraphMetadataOptions
 * @param options.getRouteTwitterMetadataOptions
 * @param options.getSiteRouteMetadataOptions
 * @return Metadata for RootLayout
 */
export async function getRouteMetadata(
	path = '/',
	options?: {
		getRouteOpenGraphMetadataOptions: GetRouteOpenGraphMetadataOptions;
		getRouteTwitterMetadataOptions: GetRouteTwitterMetadataOptions;
		getSiteRouteMetadataOptions: GetSiteRouteMetadataOptions;
	}
): Promise< Metadata > {
	const ogMetaData = await getRouteOpenGraphMetadata(
		path,
		options?.getRouteOpenGraphMetadataOptions
	);
	const twitterMetaData = await getRouteTwitterMetadata(
		path,
		options?.getRouteTwitterMetadataOptions
	);
	const siteMetaData = await getSiteMetadata(
		path,
		options?.getSiteRouteMetadataOptions
	);

	return {
		...ogMetaData,
		...twitterMetaData,
		...siteMetaData,
	};
}
