import React, { PropsWithChildren } from 'react';
import { BlockData, cn, getClassNamesFromString } from '@snapwp/core';

export interface CorePostContentProps extends PropsWithChildren< BlockData > {}

/**
 * Renders the core/post-content block.
 *
 * @param props - The props for the block component.
 * @param props.children - The block's children.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CorePostContent( {
	renderedHtml,
	children,
}: CorePostContentProps ) {
	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );
	return <div className={ classNames }>{ children }</div>;
}
