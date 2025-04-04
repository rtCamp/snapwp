import type { Metadata } from 'next';
import type { RouteMetadataFragFragment } from '@snapwp/query';
import type { TemplateMetadataParser } from '../types';
import getCleanExcerpt from '@/seo/utils/get-clean-excerpt';

/**
 *
 * @param data
 */
const parseRouteSiteMetadata: TemplateMetadataParser<
	RouteMetadataFragFragment
> = ( data: RouteMetadataFragFragment ) => {
	const metadata: Metadata = {};

	if ( ! data.connectedNode ) {
		return metadata;
	}

	const node = data.connectedNode;

	switch ( node.__typename ) {
		case 'Page':
			if ( node.title ) {
				metadata.title = node.title;
			}
			if ( node.content ) {
				metadata.description = getCleanExcerpt( node.content );
			}
			if ( node.author?.node?.name ) {
				metadata.authors = [ { name: node.author.node.name } ];
			}
			break;
		case 'Post':
			if ( node.title ) {
				metadata.title = node.title;
			}
			if ( node.excerpt ) {
				metadata.description = getCleanExcerpt( node.excerpt );
			}
			if ( node.author?.node?.name ) {
				metadata.authors = [ { name: node.author.node.name } ];
			}
			break;
		case 'Category':
		case 'Tag':
			if ( node.name ) {
				metadata.title = node.name;
			}
			if ( node.description ) {
				metadata.description = getCleanExcerpt( node.description );
			}
			break;
		default:
			break;
	}

	return metadata;
};

export default parseRouteSiteMetadata;
