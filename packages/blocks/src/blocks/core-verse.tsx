import React from 'react';
import {
	BlockData,
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';

interface CoreVerseAttributes {
	content?: string;
	style?: string;
}

export interface CoreVerseProps extends BlockData {
	attributes?: CoreVerseAttributes;
}

/**
 * Renders the core/verse block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreVerse( {
	attributes,
	renderedHtml,
}: CoreVerseProps ) {
	const { style, content } = attributes ?? {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<pre className={ classNames } style={ styleObject }>
			{ !! content && <Parse html={ content } /> }
		</pre>
	);
}
