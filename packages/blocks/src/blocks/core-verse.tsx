import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreVerse as CoreVerseType, CoreVerseProps } from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/verse block.
 *
 * @param {Object}                         props              The props for the block component.
 * @param {CoreVerseProps['attributes']}   props.attributes   Block attributes.
 * @param {CoreVerseProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreVerse: CoreVerseType = ( {
	attributes,
	renderedHtml,
}: CoreVerseProps ): ReactNode => {
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
		<pre
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
			{ !! content && <Parse html={ content } /> }
		</pre>
	);
};
