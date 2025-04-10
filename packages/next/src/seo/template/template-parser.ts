import { sanitizeHtml } from '@snapwp/core';
import type { TemplateMetadataParser } from '../types';
import type { RouteMetadataFragFragment } from '@snapwp/query';

/**
 * @param {RouteMetadataFragFragment} data Queried data
 * @return meta data object comsumable by next
 */
export const parseRouteSiteMetadata: TemplateMetadataParser<
	RouteMetadataFragFragment
> = ( data: RouteMetadataFragFragment ) => {
	if ( ! data.connectedNode ) {
		return {};
	}

	const node = data.connectedNode;

	switch ( node.__typename ) {
		case 'Page':
		case 'Post':
			const rawDescription =
				node.__typename === 'Page' ? node.content : node.excerpt;
			const description =
				rawDescription && sanitizeHtml( rawDescription );
			const author = node.__typename === 'Post' &&
				node.author && { name: node.author.node.name || undefined };

			return {
				title: node.title,
				description,
				authors: [ { ...author } ],
			};
		case 'Category':
		case 'Tag':
			return {
				title: node.name,
				description: node.description,
			};
		default:
			return {};
	}
};
