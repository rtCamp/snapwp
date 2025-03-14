import type { GetTwitterMetadataQuery } from '@graphqlTypes/graphql';
import type { ParsedTwitterMetadata } from '@snapwp/types';

/**
 * Parses Twitter metadata (for individual pages and posts).
 *
 * @param data - The GraphQL query result for Twitter metadata.
 * @return Parsed Twitter metadata.
 */
export default function parseTwitterMetadata(
	data: GetTwitterMetadataQuery
): ParsedTwitterMetadata {
	if ( ! data?.nodeByUri ) {
		return {};
	}

	const node = data.nodeByUri;
	const metadata: ParsedTwitterMetadata = {};

	switch ( node.__typename ) {
		case 'Page':
		case 'Post': {
			metadata.title = node.title ?? undefined;
			metadata.image = node.featuredImage?.node?.sourceUrl
				? {
						url: node.featuredImage.node.sourceUrl,
						width:
							node.featuredImage.node.mediaDetails?.width ??
							undefined,
						height:
							node.featuredImage.node.mediaDetails?.height ??
							undefined,
				  }
				: undefined;
			break;
		}
		default:
			break;
	}

	return metadata;
}
