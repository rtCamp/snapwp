import { gql, type TypedDocumentNode } from '@apollo/client';
import { print, type DocumentNode } from 'graphql';
import getFragmentName from './get-fragment-name';

/**
 * @param {TypedDocumentNode<unknown,unknown>} fragments Fragment on RootQuery
 * @return query document with all fragments
 */
export default function generateRootQuery(
	fragments: TypedDocumentNode< unknown, unknown >[]
): DocumentNode {
	return gql`
        ${ Object.values( fragments ).map( ( fragmentDoc ) =>
			print( fragmentDoc )
		) }
        query getRoot{
            ${ Object.values( fragments ).map(
				( fragmentDoc ) => `...${ getFragmentName( fragmentDoc ) }`
			) }
        }
    `;
}
