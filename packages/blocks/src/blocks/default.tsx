import React from 'react';
import { Parse } from '@snapwp/next';
import { BlockData } from '..';

export interface DefaultProps extends Omit< BlockData, 'type' > {}

/**
 * Renders the default block.
 * @param props - The props for the component.
 * @param props.renderedHtml - The rendered HTML.
 * @return The rendered default block.
 */
export default function Default( { renderedHtml }: DefaultProps ) {
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
}
