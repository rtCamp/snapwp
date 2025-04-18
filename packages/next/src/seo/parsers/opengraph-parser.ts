import sanitizeHtml from 'sanitize-html';
import { getDescriptionFromNode } from '../utils';
import type { Metadata } from 'next';

export interface Node {
	id: string;
	title?: string | undefined | null;
	name?: string | undefined | null;
	description?: string | undefined | null;
	excerpt?: string | undefined | null;
	content?: string | undefined | null;
}

/**
 * Parses out open graph metadata.
 *
 * @param {Node} node - Node from which OG metadata should be derived.
 * @return Parsed Open Graph metadata for the given route.
 */
export const parseNode = < T extends Node >(
	node: T | null | undefined
): Metadata => {
	const title = node?.title || node?.name || undefined;

	const description = getDescriptionFromNode( node );

	return {
		openGraph: {
			title,
			description: description ? sanitizeHtml( description ) : undefined,
		},
	};
};
