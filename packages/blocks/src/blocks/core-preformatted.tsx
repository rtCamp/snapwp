import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import { CorePreformatted, CorePreformattedProps } from '@snapwp/types';

/**
 * Renders the core/preformatted block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CorePreformatted: CorePreformatted = ( {
	attributes,
	renderedHtml,
}: CorePreformattedProps ) => {
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
};

export default CorePreformatted;
