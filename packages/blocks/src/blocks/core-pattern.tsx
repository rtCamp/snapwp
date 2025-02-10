import { BlockData } from '..';
import React, { PropsWithChildren } from 'react';

export interface CorePatternProps
	extends PropsWithChildren< Omit< BlockData, 'type' > > {}

/**
 * Renders the core/pattern block.
 *
 * @param props - The props for the block component.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CorePattern( { children }: CorePatternProps ) {
	// Patterns contain only children, so we just return them.
	return <>{ children }</>;
}
