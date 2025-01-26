import React from 'react';
import { Parse } from '@snapwp/next';

/**
 * Renders the core/html block.
 *
 * @param props - The props for the block component.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreHtml( { renderedHtml }: any ) {
	// @todo use attributes.content instead of renderedHtml once it's available
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
}
