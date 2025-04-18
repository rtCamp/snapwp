import { gql } from '@apollo/client';
import {
	Kind,
	print,
	type DocumentNode,
	type FragmentDefinitionNode,
} from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

/**
 *
 * @param {DocumentNode} fragment A fragment
 * @return Fragment name
 */
const getFragmentName = ( fragment: DocumentNode ): string | null => {
	const fragmentDef = fragment.definitions.find(
		( def ) => def.kind === Kind.FRAGMENT_DEFINITION
	) as FragmentDefinitionNode | undefined;

	return fragmentDef?.name.value ?? null;
};

/**
 * @param {TypedDocumentNode<unknown,unknown>} fragments Fragment on RootQuery
 * @return query document with all fragments
 */
export function generateRootQuery(
	fragments: TypedDocumentNode< unknown, unknown >[]
): DocumentNode {
	return gql`
		${ Object.values( fragments ).map( ( fragmentDoc ) => print( fragmentDoc ) ) }
		query getRoot{
			${ Object.values( fragments ).map(
				( fragmentDoc ) => `...${ getFragmentName( fragmentDoc ) }`
			) }
		}
	`;
}

/**
 * @param {TypedDocumentNode<unknown,unknown>} fragments fragment on RenderedTemplate
 * @return query document with all fragments
 */
export function generateTemplateQuery(
	fragments: TypedDocumentNode< unknown, unknown >[]
): DocumentNode {
	return gql`
		${ Object.values( fragments ).map( ( fragmentDoc ) => print( fragmentDoc ) ) }
		query getTemplate($uri: String!) {
			templateByUri(uri: $uri) {
			${ Object.values( fragments ).map(
				( fragmentDoc ) => `...${ getFragmentName( fragmentDoc ) }`
			) }
			}
		}
	`;
}
