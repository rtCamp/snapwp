import type {
	CorePattern as CorePatternType,
	CorePatternProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/pattern block.
 *
 * @param props - The props for the block component.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
const CorePattern: CorePatternType = ( {
	children,
}: CorePatternProps ): ReactNode => {
	// Patterns contain only children, so we just return them.
	return <>{ children }</>;
};

export default CorePattern;
