import { type TypedDocumentNode, gql } from '@apollo/client';
import { print, type DocumentNode } from 'graphql';
import getFragmentName from './get-fragment-name';
/**
 *
 * @param fragments
 */
export default function generateRootQuery(
	fragments: TypedDocumentNode< unknown, unknown >[]
): DocumentNode {
	return gql`
        ${ Object.values( fragments ).map( ( fragmentDoc ) =>
			print( fragmentDoc )
		) }
        query getSEORootData{
            ${ Object.values( fragments ).map(
				( fragmentDoc ) => `...${ getFragmentName( fragmentDoc ) }`
			) }
        }
    `;
}
