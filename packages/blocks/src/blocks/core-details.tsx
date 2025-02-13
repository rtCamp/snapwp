import React, { PropsWithChildren } from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { BlockProps } from '..';

export interface CoreDetailsAttributes extends Record< string, unknown > {
	style?: string;
	showContent: boolean;
	summary?: string;
}

export interface CoreDetailsProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreDetailsAttributes;
}

/**
 * Renders the core/details block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreDetails( {
	attributes,
	children,
	renderedHtml,
}: CoreDetailsProps ) {
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
}
