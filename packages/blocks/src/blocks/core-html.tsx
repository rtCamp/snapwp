import React from 'react';
import { Parse } from '@snapwp/next';
import { BlockData } from '@snapwp/core';

export interface CoreHtmlProps extends BlockData {}

/**
 * Renders the core/html block.
 *
 * @param props - The props for the block component.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreHtml( { renderedHtml }: CoreHtmlProps ) {
	// @todo use attributes.content instead of renderedHtml once it's available
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
}
