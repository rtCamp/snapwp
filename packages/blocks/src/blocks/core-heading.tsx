import React, { type JSX } from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import { CoreHeading, CoreHeadingProps } from '@snapwp/types';

/**
 * Renders the core/heading block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
const CoreHeading: CoreHeading = ( { attributes }: CoreHeadingProps ) => {
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
};

export default CoreHeading;
