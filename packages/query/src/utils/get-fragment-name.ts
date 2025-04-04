import { Kind, type DocumentNode, type FragmentDefinitionNode } from 'graphql';

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

export default getFragmentName;
