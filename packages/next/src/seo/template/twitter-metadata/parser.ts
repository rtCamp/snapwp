import type { TwitterMetadataFragFragment } from '@snapwp/query';
import type { TemplateMetadataParser } from '../types';
import type { Metadata } from 'next';

/**
 * Parses the Twitter metadata.
 *
 * @param data - The data to parse for Twitter information.
 * @return Parsed Twitter metadata for the given route.
 */
const parseRouteTwitterMetadata: TemplateMetadataParser<
	TwitterMetadataFragFragment
> = ( data: TwitterMetadataFragFragment ) => {
	const twitterMetadata: Metadata[ 'twitter' ] = {};

	if ( ! data.connectedNode ) {
		return { ...twitterMetadata };
	}

	if (
		data.connectedNode.__typename !== 'Page' &&
		data.connectedNode.__typename !== 'Post'
	) {
		return { ...twitterMetadata };
	}

	if ( data.connectedNode.title ) {
		twitterMetadata.title = data.connectedNode.title;
	}

	const imageNode = data.connectedNode.featuredImage?.node;

	if ( imageNode && imageNode.sourceUrl ) {
		twitterMetadata.images = [
			{
				url: imageNode.sourceUrl,
				width: imageNode.mediaDetails?.width || undefined,
				height: imageNode.mediaDetails?.height || undefined,
			},
		];
	}
	return twitterMetadata;
};

export default parseRouteTwitterMetadata;
