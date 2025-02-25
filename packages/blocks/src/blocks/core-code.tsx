import React from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreCode as CoreCodeType, CoreCodeProps } from '@snapwp/types';

/**
 * Renders the core/code block.
 *
 * @param {Object}                   props            The props for the block component.
 * @param {CoreCodeProps.attributes} props.attributes Block attributes.
 *
 * @return The rendered block.
 */
const CoreCode: CoreCodeType = ( { attributes }: CoreCodeProps ) => {
	const { style, cssClassName, content } = attributes || {};
	const styleObject = getStylesFromAttributes( { style } );

	return (
		<pre className={ cssClassName || '' } style={ styleObject }>
			<code>{ !! content && <Parse html={ content } /> }</code>
		</pre>
	);
};

export default CoreCode;
