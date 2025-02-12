import React, { type JSX } from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { BlockProps } from '..';
import { Parse } from '@snapwp/next';

export interface CoreHeadingAttributes extends Record< string, unknown > {
	content?: string;
	cssClassName?: string;
	level: number;
	style?: string;
}

export interface CoreHeadingProps extends BlockProps {
	attributes?: CoreHeadingAttributes;
}

/**
 * Renders the core/heading block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
export default function CoreHeading( { attributes }: CoreHeadingProps ) {
	const { style, cssClassName, content, level } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	const HeadingTag = level
		? ( `h${ level }` as keyof JSX.IntrinsicElements )
		: 'div';

	return (
		<HeadingTag
			style={ styleObject }
			className={ cssClassName || undefined }
		>
			{ !! content && <Parse html={ content } /> }
		</HeadingTag>
	);
}
