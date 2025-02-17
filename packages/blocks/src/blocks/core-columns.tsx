import React from 'react';
import { cn, getStylesFromAttributes } from '@snapwp/core';
import { CoreColumns, CoreColumnsProps } from '@snapwp/types';

/**
 * Renders the core/columns block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
const CoreColumns: CoreColumns = ( {
	attributes,
	children,
}: CoreColumnsProps ) => {
	const { cssClassName, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );
	const classNames = cn( cssClassName );

	return (
		<div className={ classNames } style={ styleObject }>
			{ children }
		</div>
	);
};

export default CoreColumns;
