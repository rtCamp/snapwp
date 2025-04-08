import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import type {
	CoreDetails as CoreDetailsType,
	CoreDetailsProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/details block.
 *
 * @param {Object}                           props              The props for the block component.
 * @param {CoreDetailsProps['attributes']}   props.attributes   Block attributes.
 * @param {ReactNode}                        props.children     The block's children.
 * @param {CoreDetailsProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreDetails: CoreDetailsType = ( {
	attributes,
	children,
	renderedHtml,
}: CoreDetailsProps ): ReactNode => {
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
			open={ showContent }
			{ ...( styleObject && { style: styleObject } ) }
		>
			<summary>{ summary }</summary>
			{ children }
		</details>
	);
};
