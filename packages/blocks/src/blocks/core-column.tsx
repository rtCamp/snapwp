import React from 'react';
import { cn, getStylesFromAttributes } from '@snapwp/core';
import { CoreColumnProps } from '@snapwp/types';

/**
 * Renders the core/column block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CoreColumn( {
	attributes,
	children,
}: CoreColumnProps ) {
	const { cssClassName, style, width } = attributes || {};

	const classNames = cn( cssClassName );
	const styleObject = getStylesFromAttributes( { style } );

	const combinedStyles: React.CSSProperties = {
		...styleObject,
		flexBasis: width ?? undefined,
	};

	return (
		<div className={ classNames } style={ combinedStyles }>
			{ children }
		</div>
	);
}
