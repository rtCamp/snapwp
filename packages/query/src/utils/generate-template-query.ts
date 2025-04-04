import { gql, type TypedDocumentNode } from '@apollo/client';
import { print, type DocumentNode } from 'graphql';
import getFragmentName from './get-fragment-name';

/**
 * @param {TypedDocumentNode<unknown,unknown>} fragments fragment on RenderedTemplate
 * @return query document with all fragments
 */
export default function generateTemplateQuery(
	fragments: TypedDocumentNode< unknown, unknown >[]
): DocumentNode {
	return gql`
        ${ Object.values( fragments ).map( ( fragmentDoc ) =>
			print( fragmentDoc )
		) }
        query getTemplate {
            templateByUri(uri: $uri) {
            ${ Object.values( fragments ).map(
				( fragmentDoc ) => `...${ getFragmentName( fragmentDoc ) }`
			) }
            }
        }
    `;
}
