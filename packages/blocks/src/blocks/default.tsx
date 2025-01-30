import React from 'react';
import { Parse } from '@snapwp/next';
import { type BlockData } from '@snapwp/core';

/**
 * Renders the default block.
 * @param props - The props for the component.
 * @param props.renderedHtml - The rendered HTML.
 * @return The rendered default block.
 */
export default function Default( { renderedHtml }: BlockData ) {
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
}
