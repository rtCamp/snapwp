import type { Metadata } from 'next';
import getRouteOpenGraphMetadata from './opengraph-metadata/getter';
import getRouteTwitterMetadata from './twitter-metadata/getter';
import getSiteMetadata from './site-metadata/getter';
import type { OpenGraphMetadata } from './opengraph-metadata/types';
import type { TwitterMetadata } from './twitter-metadata/types';
import type { SiteMetadata } from './site-metadata/types';
import type { RouteGetterOptions } from '../types';

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
		getRouteOpenGraphMetadataOptions: RouteGetterOptions< OpenGraphMetadata >;
		getRouteTwitterMetadataOptions: RouteGetterOptions< TwitterMetadata >;
		getSiteRouteMetadataOptions: RouteGetterOptions< SiteMetadata >;
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
