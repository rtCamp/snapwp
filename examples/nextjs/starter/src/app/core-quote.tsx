import React from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';

/**
 * Renders the core/quote block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CoreQuote( { attributes, children }: any ) {
	const { style, citation, cssClassName } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	return (
		<blockquote className={ cssClassName || '' } style={ styleObject }>
			{ children }
			{ !! citation && (
				<cite>
					<Parse html={ citation } />
				</cite>
			) }
		</blockquote>
	);
}
