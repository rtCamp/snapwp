import React from 'react';
import { CorePattern, CorePatternProps } from '@snapwp/types';

/**
 * Renders the core/pattern block.
 *
 * @param props - The props for the block component.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
const CorePattern: CorePattern = ( { children }: CorePatternProps ) => {
	// Patterns contain only children, so we just return them.
	return <>{ children }</>;
};

export default CorePattern;
