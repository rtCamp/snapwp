import sanitizeHtml from 'sanitize-html';
import type { TemplateMetadataParser } from '../types';
import type { RouteMetadataFragFragment } from '@snapwp/query';

/**
 * @param {RouteMetadataFragFragment} data Queried data
 * @return meta data object comsumable by next
 */
export const parseRouteSiteMetadata: TemplateMetadataParser<
	RouteMetadataFragFragment
> = ( data: RouteMetadataFragFragment ) => {
	// Type casting required to not rely on __typename
	// @todo fix codegen types
	const node = data.connectedNode as unknown as
		| {
				title: string | null | undefined;
				name: string | null | undefined;
				content: string | null | undefined;
				excerpt: string | null | undefined;
				description: string | null | undefined;
				author:
					| {
							node:
								| {
										name: string | null | undefined;
								  }
								| null
								| undefined;
					  }
					| null
					| undefined;
		  }
		| undefined
		| null;

	if ( ! node ) {
		return {};
	}

	const title = node?.title || node?.name || undefined;

	// If there's no description, use the first 150 characters of the content
	let description = node?.excerpt || node?.description || null;

	if ( ! description ) {
		const trimmedContent = node?.content?.substring( 0, 150 );

		if ( trimmedContent ) {
			description = trimmedContent + '...';
		}
	}

	const authors = [];

	if ( node.author?.node?.name ) {
		authors.push( {
			name: node.author.node.name,
		} );
	}
	return {
		title,
		description: description ? sanitizeHtml( description ) : undefined,
		authors,
	};
};
