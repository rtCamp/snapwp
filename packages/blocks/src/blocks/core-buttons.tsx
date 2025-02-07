import React, { PropsWithChildren } from 'react';
import { BlockData, cn, getStylesFromAttributes } from '@snapwp/core';

interface CoreButtonsAttributes {
	cssClassName?: string;
	style?: string;
}

export interface CoreButtonsProps extends PropsWithChildren< BlockData > {
	attributes?: CoreButtonsAttributes;
}

/**
 * Renders the core/buttons block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CoreButtons( {
	attributes,
	children,
}: CoreButtonsProps ) {
	const { cssClassName, style } = attributes || {};
	const classNames = cn( cssClassName );

	const styleObject = getStylesFromAttributes( { style } );

	return (
		<div className={ classNames } style={ styleObject }>
			{ children }
		</div>
	);
}
