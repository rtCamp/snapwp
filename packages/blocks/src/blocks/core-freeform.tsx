import React from 'react';
import { Parse } from '@snapwp/next';
import type {
	CoreFreeform as CoreFreeformType,
	CoreFreeformProps,
} from '@snapwp/types';

/**
 * Renders the core/freeform block.
 *
 * @param props - The props for the block component.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreFreeform: CoreFreeformType = ( {
	renderedHtml,
}: CoreFreeformProps ) => {
	// @todo `attribues.content` is not populated in GraphQL. Using `renderedHtml` for now.
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
};

export default CoreFreeform;
