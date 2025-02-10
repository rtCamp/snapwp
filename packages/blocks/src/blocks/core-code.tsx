import React from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import { BlockData } from '..';

export interface CoreCodeAttributes {
	style?: string;
	content?: string;
	cssClassName?: string;
}

export interface CoreCodeProps extends Omit< BlockData, 'type' > {
	attributes?: CoreCodeAttributes;
}

/**
 * Renders the core/code block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
export default function CoreCode( { attributes }: CoreCodeProps ) {
	const { style, cssClassName, content } = attributes || {};
	const styleObject = getStylesFromAttributes( { style } );

	return (
		<pre className={ cssClassName || '' } style={ styleObject }>
			<code>{ !! content && <Parse html={ content } /> }</code>
		</pre>
	);
}
