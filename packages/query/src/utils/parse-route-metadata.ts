import type { GetRouteMetadataQuery } from '@graphqlTypes/graphql';
import getCleanExcerpt from '@/utils/get-clean-excerpt';
import type { ParsedRouteMetadata } from '@snapwp/types';

/**
 * Parses route metadata (for individual pages, posts, categories, etc.).
 *
 * @param data - The GraphQL query result for route metadata.
 * @return Parsed route metadata.
 */
export default function parseRouteMetadata(
	data: GetRouteMetadataQuery
): ParsedRouteMetadata {
	if ( ! data || ! data.nodeByUri ) {
		return {};
	}

	const node = data.nodeByUri;

	// Define common metadata
	const metadata: ParsedRouteMetadata = {};

	// Handle Pages
	if ( node.__typename === 'Page' ) {
		metadata.title = node.title ?? undefined;
		metadata.description = node.content
			? getCleanExcerpt( node.content )
			: undefined;
		metadata.authors = node.author?.node?.name
			? [ { name: node.author.node.name } ]
			: undefined;
	}

	// Handle Posts
	if ( node.__typename === 'Post' ) {
		metadata.title = node.title ?? undefined;
		metadata.description = node.excerpt
			? getCleanExcerpt( node.excerpt )
			: undefined;
		metadata.authors = node.author?.node?.name
			? [ { name: node.author.node.name } ]
			: undefined;
	}

	// Handle Categories, Tags, and Users
	if (
		node.__typename === 'Category' ||
		node.__typename === 'Tag' ||
		node.__typename === 'User'
	) {
		metadata.title = node.name ?? undefined;
		metadata.description = node.description ?? undefined;
	}

	return metadata;
}
