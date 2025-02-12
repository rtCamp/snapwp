import React, { PropsWithChildren } from 'react';
import { cn, getStylesFromAttributes } from '@snapwp/core';
import { BlockProps } from '..';

export interface CoreColumnsAttributes extends Record< string, unknown > {
	style?: string;
	cssClassName?: string;
}

export interface CoreColumnsProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreColumnsAttributes;
}

/**
 * Renders the core/columns block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CoreColumns( {
	attributes,
	children,
}: CoreColumnsProps ) {
	const { cssClassName, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );
	const classNames = cn( cssClassName );

	return (
		<div className={ classNames } style={ styleObject }>
			{ children }
		</div>
	);
}
