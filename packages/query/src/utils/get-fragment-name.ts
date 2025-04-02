import { type DocumentNode, type FragmentDefinitionNode, Kind } from 'graphql';

/**
 *
 * @param fragment
 */
const getFragmentName = ( fragment: DocumentNode ): string | null => {
	const fragmentDef = fragment.definitions.find(
		( def ) => def.kind === Kind.FRAGMENT_DEFINITION
	) as FragmentDefinitionNode | undefined;

	return fragmentDef?.name.value ?? null;
};

export default getFragmentName;
