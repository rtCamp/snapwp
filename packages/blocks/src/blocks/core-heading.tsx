import React, { type JSX } from 'react';
import { getStylesFromAttributes } from '@snapwp/core';

/**
 * Renders the core/heading block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
export default function CoreHeading( { attributes }: any ) {
	const { style, cssClassName, content, level } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	const HeadingTag = level
		? ( `h${ level }` as keyof JSX.IntrinsicElements )
		: 'div';

	return (
		<HeadingTag
			style={ styleObject }
			className={ cssClassName || '' }
			dangerouslySetInnerHTML={ { __html: content || '' } }
		/>
	);
}
