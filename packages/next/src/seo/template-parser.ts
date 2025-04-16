import sanitizeHtml from 'sanitize-html';
import { getNodeDescription } from './utils';
import type { Metadata } from 'next';

export interface Node {
	id: string;
	title?: string | null | undefined;
	name?: string | null | undefined;
	excerpt?: string | null | undefined;
	description?: string | null | undefined;
	content?: string | null | undefined;
	author?:
		| {
				node?:
					| {
							name?: string | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
}

/**
 * Parses out route metadata
 *
 * @param {Node} node Connected node.
 * @return meta data object comsumable by next
 */
export const parseNode = < T extends Node >(
	node: T | null | undefined
): Metadata => {
	if ( ! node ) {
		return {};
	}

	const title = node?.title || node?.name || undefined;
	const description = getNodeDescription( node );

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
