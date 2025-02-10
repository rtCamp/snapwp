import React from 'react';
import {
	BlockData,
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';

interface CorePullquoteAttributes {
	citation?: string;
	style?: string;
	textAlign?: string;
	pullquoteValue?: string;
}

export interface CorePullquoteProps extends BlockData {
	attributes?: CorePullquoteAttributes;
}

/**
 * Renders the core/pullquote block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CorePullquote( {
	attributes,
	renderedHtml,
}: CorePullquoteProps ) {
	const { style, pullquoteValue, citation } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<figure style={ styleObject } className={ classNames }>
			<blockquote>
				{ pullquoteValue && (
					<p>
						<Parse html={ pullquoteValue } />
					</p>
				) }

				{ citation && (
					<cite>
						<Parse html={ citation } />
					</cite>
				) }
			</blockquote>
		</figure>
	);
}
