import React, { PropsWithChildren } from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { BlockData } from '..';
import { Parse } from '@snapwp/next';

interface CoreQuoteAttributes {
	citation?: string;
	cssClassName?: string;
	style?: string;
	value: string;
}

export interface CoreQuoteProps
	extends PropsWithChildren< Omit< BlockData, 'type' > > {
	attributes?: CoreQuoteAttributes;
}

/**
 * Renders the core/quote block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CoreQuote( { attributes, children }: CoreQuoteProps ) {
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
