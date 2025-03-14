import type { ParsedOpenGraphMetadata } from '@snapwp/types';
import type { GetOpenGraphMetadataQuery } from '..';
import getCleanExcerpt from './get-clean-excerpt';

/**
 * Parses Open Graph metadata from the GraphQL query result.
 *
 * @param data - The GraphQL query result for Open Graph metadata.
 * @return Parsed Open Graph metadata.
 */
export default function parseOpenGraphMetadata(
	data: GetOpenGraphMetadataQuery
): ParsedOpenGraphMetadata {
	if ( ! data?.nodeByUri ) {
		return {};
	}

	const node = data.nodeByUri;
	const metadata: ParsedOpenGraphMetadata = {
		type: node.__typename === 'Post' ? 'article' : 'website',
		url: node.uri ?? undefined,
	};

	switch ( node.__typename ) {
		case 'Page':
			metadata.title = node.title ?? undefined;
			metadata.description = node.content
				? getCleanExcerpt( node.content )
				: undefined;

			if ( node.featuredImage?.node?.sourceUrl ) {
				metadata.images = [
					{
						url: node.featuredImage.node.sourceUrl,
						width:
							node.featuredImage.node.mediaDetails?.width ??
							undefined,
						height:
							node.featuredImage.node.mediaDetails?.height ??
							undefined,
					},
				];
			}
			break;

		case 'Post':
			metadata.title = node.title ?? undefined;
			metadata.description = node.excerpt
				? getCleanExcerpt( node.excerpt )
				: undefined;
			metadata.publishedTime = node.date ?? undefined;
			metadata.modifiedTime = node.modified ?? undefined;

			if ( node.featuredImage?.node?.sourceUrl ) {
				metadata.images = [
					{
						url: node.featuredImage.node.sourceUrl,
						width:
							node.featuredImage.node.mediaDetails?.width ??
							undefined,
						height:
							node.featuredImage.node.mediaDetails?.height ??
							undefined,
					},
				];
			}
			break;

		case 'Category':
		case 'Tag':
		case 'User':
			metadata.title = node.name ?? undefined;
			metadata.description = node.description ?? undefined;
			break;

		default:
			// Other types are not handled for OpenGraph metadata
			break;
	}

	return metadata;
}
