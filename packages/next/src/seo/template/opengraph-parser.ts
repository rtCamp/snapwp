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
	// Type casting required to not rely on __typename
	// @todo fix codegen types
	const node = data.connectedNode as unknown as
		| {
				title: string | undefined | null;
				name: string | undefined | null;
				description: string | undefined | null;
				excerpt: string | undefined | null;
				content: string | undefined | null;
		  }
		| null
		| undefined;

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

	return {
		openGraph: {
			title,
			description: description ? sanitizeHtml( description ) : undefined,
		},
	};
};
