import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type {
	CorePreformatted as CorePreformattedType,
	CorePreformattedProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/preformatted block.
 *
 * @param {Object}                                props              The props for the block component.
 * @param {CorePreformattedProps['attributes']}   props.attributes   Block attributes.
 * @param {CorePreformattedProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CorePreformatted: CorePreformattedType = ( {
	attributes,
	renderedHtml,
}: CorePreformattedProps ): ReactNode => {
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
		<pre
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
			{ !! content && <Parse html={ content } /> }
		</pre>
	);
};

export default CorePreformatted;
