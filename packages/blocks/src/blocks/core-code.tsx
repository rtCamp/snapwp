import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreCode as CoreCodeType, CoreCodeProps } from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/code block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
const CoreCode: CoreCodeType = ( { attributes }: CoreCodeProps ): ReactNode => {
	const { style, cssClassName, content } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	return (
		<pre
			{ ...( cssClassName && { className: cssClassName } ) }
			{ ...( styleObject && { style: styleObject } ) }
		>
			<code>{ !! content && <Parse html={ content } /> }</code>
		</pre>
	);
};

export default CoreCode;
