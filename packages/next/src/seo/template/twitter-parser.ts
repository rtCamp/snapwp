import type { TemplateMetadataParser } from '../types';
import type { TwitterMetadataFragFragment } from '@snapwp/query';
import type { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

/**
 * Parses the Twitter metadata.
 *
 * @param {TwitterMetadataFragFragment} data - The data to parse for Twitter information.
 * @return Parsed Twitter metadata for the given route.
 */
export const parseRouteTwitterMetadata: TemplateMetadataParser<
	TwitterMetadataFragFragment
> = ( data: TwitterMetadataFragFragment ) => {
	// No connected node to the path. No twitter meta data
	if ( ! data.connectedNode ) {
		return {};
	}

	switch ( data.connectedNode.__typename ) {
		case 'Page':
		case 'Post':
			const title = data.connectedNode.title || undefined;
			const imageNode = data.connectedNode.featuredImage?.node;
			let images: Twitter[ 'images' ];

			if ( imageNode && imageNode.sourceUrl ) {
				images = [
					{
						url: imageNode.sourceUrl,
						width: imageNode.mediaDetails?.width || undefined,
						height: imageNode.mediaDetails?.height || undefined,
					},
				];
			}

			return {
				twitter: {
					title,
					images,
				},
			};

		default:
			return {};
	}
};
