import React from 'react';
import { Parse } from '@snapwp/next';
import { BlockData } from '..';

export interface CoreFreeformProps extends Omit< BlockData, 'type' > {}

/**
 * Renders the core/freeform block.
 *
 * @param props - The props for the block component.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreFreeform( { renderedHtml }: CoreFreeformProps ) {
	// @todo `attribues.content` is not populated in GraphQL. Using `renderedHtml` for now.
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
}
