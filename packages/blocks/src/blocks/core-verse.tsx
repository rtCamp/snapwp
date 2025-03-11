import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreVerse as CoreVerseType, CoreVerseProps } from '@snapwp/types';

/**
 * Renders the core/verse block.
 *
 * @param {Object}                      props              The props for the block component.
 * @param {CoreVerseProps.attributes}   props.attributes   Block attributes.
 * @param {CoreVerseProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreVerse: CoreVerseType = ( {
	attributes,
	renderedHtml,
}: CoreVerseProps ) => {
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
};

export default CoreVerse;
