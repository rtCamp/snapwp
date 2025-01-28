import React from 'react';

/**
 * Renders the core/pattern block.
 *
 * @param props - The props for the block component.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CorePattern( { children }: any ) {
	// Patterns contain only children, so we just return them.
	return <>{ children }</>;
}
