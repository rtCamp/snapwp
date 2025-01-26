import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';

/**
 * Renders the core/details block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreDetails( {
	attributes,
	children,
	renderedHtml,
}: any ) {
	const { style, showContent, summary } = attributes ?? {};
	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<details
			className={ classNames }
			style={ styleObject }
			open={ showContent }
		>
			<summary>{ summary }</summary>
			{ children }
		</details>
	);
}
