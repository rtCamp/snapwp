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

/**
 * Renders the core/preformatted block.
 *
 * @param {Object}                             props              The props for the block component.
 * @param {CorePreformattedProps.attributes}   props.attributes   Block attributes.
 * @param {CorePreformattedProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CorePreformatted: CorePreformattedType = ( {
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
