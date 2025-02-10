import React from 'react';
import { getClassNamesFromString } from '@snapwp/core';
import { BlockData } from '..';

export interface CoreSeparatorProps extends Omit< BlockData, 'type' > {}

/**
 * Renders the core/separator block.
 *
 * @param props - The props for the block component.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreSeparator( { renderedHtml }: CoreSeparatorProps ) {
	const classes = getClassNamesFromString( renderedHtml || '' ).join( ' ' );
	return <hr className={ classes } />;
}
