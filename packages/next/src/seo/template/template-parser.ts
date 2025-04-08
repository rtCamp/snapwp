import { sanitizeHtml } from '@snapwp/core';
import type { TemplateMetadataParser } from '../types';
import type { RouteMetadataFragFragment } from '@snapwp/query';
import type { Metadata } from 'next';

/**
 * @param {RouteMetadataFragFragment} data Queried data
 * @return meta data object comsumable by next
 */
export const parseRouteSiteMetadata: TemplateMetadataParser<
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
				metadata.description = sanitizeHtml( node.content );
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
				metadata.description = sanitizeHtml( node.excerpt );
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
				metadata.description = sanitizeHtml( node.description );
			}
			break;
		default:
			break;
	}

	return metadata;
};
