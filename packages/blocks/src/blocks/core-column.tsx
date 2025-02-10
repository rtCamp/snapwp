import React, { PropsWithChildren } from 'react';
import { cn, getStylesFromAttributes } from '@snapwp/core';
import { BlockData } from '..';

interface CoreColumnAttributes {
	style?: string;
	width?: string;
	cssClassName?: string;
}

export interface CoreColumnProps
	extends PropsWithChildren< Omit< BlockData, 'type' > > {
	attributes?: CoreColumnAttributes;
}

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
