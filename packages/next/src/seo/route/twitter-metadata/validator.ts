import { getCleanExcerpt } from '@/seo/utils';
import type { TwitterMetadata } from './types';
import { RouteTwitterMetadataSchema } from './schema';
import type { RouteValidator } from '../types';

/**
 * Parses the Twitter metadata.
 *
 * @param data - The data to parse for Twitter information.
 * @return Parsed Twitter metadata for the given route.
 */
const validateRouteTwitterMetadata: RouteValidator< TwitterMetadata > = (
	data: unknown
) => {
	const parsedData = RouteTwitterMetadataSchema.safeParse( data );
	if ( ! parsedData.success || ! parsedData.data.nodeByUri ) {
		return {};
	}

	const node = parsedData.data.nodeByUri;
	const metadata: TwitterMetadata = {};

	switch ( node.__typename ) {
		case 'Page':
		case 'Post':
			if ( node.title ) {
				metadata.title = node.title;
			}
			if ( node.description ) {
				metadata.description = getCleanExcerpt( node.description );
			}
			const imageUrl = node.featuredImage?.node?.sourceUrl;
			if ( imageUrl ) {
				metadata.image = {
					url: imageUrl,
					...( node.featuredImage?.node?.mediaDetails?.width && {
						width: node.featuredImage.node.mediaDetails.width,
					} ),
					...( node.featuredImage?.node?.mediaDetails?.height && {
						height: node.featuredImage.node.mediaDetails.height,
					} ),
				};
			}
			break;
	}

	return metadata;
};

export default validateRouteTwitterMetadata;
