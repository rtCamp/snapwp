import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreCode as CoreCodeType, CoreCodeProps } from '@snapwp/types';

/**
 * Renders the core/code block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
const CoreCode: CoreCodeType = ( { attributes }: CoreCodeProps ) => {
	const { style, cssClassName, content } = attributes || {};

	return (
		<pre
			{ ...( cssClassName && { className: cssClassName } ) }
			{ ...( style && { style: getStylesFromAttributes( { style } ) } ) }
		>
			<code>{ !! content && <Parse html={ content } /> }</code>
		</pre>
	);
};

export default CoreCode;
