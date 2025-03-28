import type { Metadata } from 'next';
import getRouteOpenGraphMetadata from './opengraph-metadata/getter';
import getRouteTwitterMetadata from './twitter-metadata/getter';
import getSiteMetadata from './site-metadata/getter';
import type { GetterOptions } from './type';
import type { OpenGraphMetadata } from './opengraph-metadata/types';
import type { TwitterMetadata } from './twitter-metadata/types';
import type { SiteMetadata } from './site-metadata/types';

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
		getRouteOpenGraphMetadataOptions: GetterOptions< OpenGraphMetadata >;
		getRouteTwitterMetadataOptions: GetterOptions< TwitterMetadata >;
		getSiteRouteMetadataOptions: GetterOptions< SiteMetadata >;
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
