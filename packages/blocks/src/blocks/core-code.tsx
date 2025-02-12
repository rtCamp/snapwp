import React from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import { BlockProps } from '..';

export interface CoreCodeAttributes extends Record< string, unknown > {
	style?: string;
	content?: string;
	cssClassName?: string;
}

export interface CoreCodeProps extends BlockProps {
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
