import { cn, getStylesFromAttributes } from '@snapwp/core';
import type {
	CoreColumns as CoreColumnsType,
	CoreColumnsProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/columns block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
const CoreColumns: CoreColumnsType = ( {
	attributes,
	children,
}: CoreColumnsProps ): ReactNode => {
	const { cssClassName, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );
	const classNames = cn( cssClassName );

	return (
		<div
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
			{ children }
		</div>
	);
};

export default CoreColumns;
