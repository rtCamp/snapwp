import sanitizeHtml from 'sanitize-html';
import type { TemplateMetadataParser } from '../types';
import type { OpenGraphMetadataFragFragment } from '@snapwp/query';

/**
 * Parses the Open Graph metadata for a specific route.
 *
 * @param {OpenGraphMetadataFragFragment} data data
 * @return Parsed Open Graph metadata for the given route.
 */
export const parseRouteOpenGraphMetadata: TemplateMetadataParser<
	OpenGraphMetadataFragFragment
> = ( data ) => {
	if ( ! data.connectedNode ) {
		return {};
	}
	const node = data.connectedNode;

	switch ( node.__typename ) {
		case 'Post':
		case 'Page':
			const rawDescription =
				node.__typename === 'Page' ? node.content : node.excerpt;
			const description =
				rawDescription && sanitizeHtml( rawDescription );
			return {
				openGraph: {
					title: node.title || undefined,
					description: description || undefined,
				},
			};
		case 'Category':
		case 'Tag':
			return {
				openGraph: {
					title: node.name || undefined,
					description: node.description || undefined,
				},
			};
		default:
			return {};
	}
};
