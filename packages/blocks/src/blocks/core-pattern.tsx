import React from 'react';
import type {
	CorePattern as CorePatternType,
	CorePatternProps,
} from '@snapwp/types';

/**
 * Renders the core/pattern block.
 *
 * @param {Object}    props          The props for the block component.
 * @param {ReactNode} props.children The block's children.
 *
 * @return The rendered block.
 */
const CorePattern: CorePatternType = ( { children }: CorePatternProps ) => {
	// Patterns contain only children, so we just return them.
	return <>{ children }</>;
};

export default CorePattern;
