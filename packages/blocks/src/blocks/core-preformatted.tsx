import React from 'react';
import {
	BlockData,
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';

interface CorePreformattedAttributes {
	content?: string;
	style?: string;
}

export interface CorePreformattedProps extends BlockData {
	attributes?: CorePreformattedAttributes;
}

/**
 * Renders the core/preformatted block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CorePreformatted( {
	attributes,
	renderedHtml,
}: CorePreformattedProps ) {
	const { content, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<pre style={ styleObject } className={ classNames }>
			{ !! content && <Parse html={ content } /> }
		</pre>
	);
}
