import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import { CoreListItem, CoreListItemProps } from '@snapwp/types';

/**
 * Renders the core/list-item block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreListItem: CoreListItem = ( {
	attributes,
	renderedHtml,
	children,
}: CoreListItemProps ) => {
	const { content, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );

	const firstLineContent = content ? content.split( '\n' )[ 0 ] : undefined;

	return (
		<li className={ classNames || undefined } style={ styleObject }>
			{ firstLineContent && <Parse html={ firstLineContent } /> }
			{ children }
		</li>
	);
};

export default CoreListItem;
