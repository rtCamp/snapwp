export interface Node {
	description?: string | undefined | null;
	excerpt?: string | undefined | null;
	content?: string | undefined | null;
}

/**
 * Gets description for node for site metatdata
 * @param {Node } node - node from whihch metadata description will be extracted
 * @return descrtipion
 */
export const getDescriptionFromNode = < T extends Node >(
	node: T | null | undefined
): string | null => {
	let description = node?.excerpt || node?.description || null;

	// If there's no description, use the first 150 characters of the content.
	// Empty strings are considered explictly set.
	if ( description === null || description === undefined ) {
		const trimmedContent = node?.content?.substring( 0, 150 );

		if ( trimmedContent ) {
			description = trimmedContent + '...';
		}
	}

	return description;
};
