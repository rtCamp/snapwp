import React from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';

/**
 * Renders the core/paragraph block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
export default function CoreParagraph( { attributes }: any ) {
	const {
		backgroundColor,
		content,
		cssClassName,
		direction,
		fontFamily,
		fontSize,
		style,
		textColor,
	} = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * Add missing styles to the style object
	 *
	 * @todo once these are available via `styles` we can remove.
	 */
	if ( backgroundColor ) {
		styleObject.backgroundColor = backgroundColor;
	}
	if ( textColor ) {
		styleObject.color = textColor;
	}
	if ( fontSize ) {
		styleObject.fontSize = fontSize;
	}
	if ( fontFamily ) {
		styleObject.fontFamily = fontFamily;
	}

	return (
		<p
			className={ cssClassName || undefined }
			style={ styleObject }
			dir={ direction || undefined }
		>
			{ !! content && <Parse html={ content } /> }
		</p>
	);
}
