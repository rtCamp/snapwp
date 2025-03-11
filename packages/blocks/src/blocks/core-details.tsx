import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import type {
	CoreDetails as CoreDetailsType,
	CoreDetailsProps,
} from '@snapwp/types';

/**
 * Renders the core/details block.
 *
 * @param {Object}                        props              The props for the block component.
 * @param {CoreDetailsProps.attributes}   props.attributes   Block attributes.
 * @param {ReactNode}                     props.children     The block's children.
 * @param {CoreDetailsProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreDetails: CoreDetailsType = ( {
	attributes,
	children,
	renderedHtml,
}: CoreDetailsProps ) => {
	const { style, showContent, summary } = attributes ?? {};
	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<details
			className={ classNames }
			style={ styleObject }
			open={ showContent }
		>
			<summary>{ summary }</summary>
			{ children }
		</details>
	);
};

export default CoreDetails;
