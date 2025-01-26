import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';

/**
 * Renders the core/pullquote block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CorePullquote( { attributes, renderedHtml }: any ) {
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
					<p
						dangerouslySetInnerHTML={ { __html: pullquoteValue } }
					></p>
				) }
				{ citation && (
					<cite
						dangerouslySetInnerHTML={ { __html: citation } }
					></cite>
				) }
			</blockquote>
		</figure>
	);
}
