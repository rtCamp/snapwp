import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type {
	CoreListItem as CoreListItemType,
	CoreListItemProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/list-item block.
 *
 * @param {Object}                         props              The props for the block component.
 * @param {CoreListItemProps.attributes}   props.attributes   Block attributes.
 * @param {ReactNode}                      props.children     The block's children.
 * @param {CoreListItemProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreListItem: CoreListItemType = ( {
	attributes,
	renderedHtml,
	children,
}: CoreListItemProps ): ReactNode => {
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
		<li
			className={ classNames || undefined }
			{ ...( styleObject && { style: styleObject } ) }
		>
			{ firstLineContent && <Parse html={ firstLineContent } /> }
			{ children }
		</li>
	);
};

export default CoreListItem;
