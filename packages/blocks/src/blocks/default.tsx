import * as React from 'react';
import { Parse } from '@snapwp/next';
import type { Default as DefaultType, DefaultProps } from '@snapwp/types';

/**
 * Renders the default block.
 * @param props - The props for the component.
 * @param props.renderedHtml - The rendered HTML.
 * @return The rendered default block.
 */
const Default: DefaultType = ( { renderedHtml }: DefaultProps ) => {
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
};

export default Default;
