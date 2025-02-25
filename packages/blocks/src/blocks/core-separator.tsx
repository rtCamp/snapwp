import React from 'react';
import { getClassNamesFromString } from '@snapwp/core';
import type {
	CoreSeparator as CoreSeparatorType,
	CoreSeparatorProps,
} from '@snapwp/types';

/**
 * Renders the core/separator block.
 *
 * @param {Object}                          props              The props for the block component.
 * @param {CoreSeparatorProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreSeparator: CoreSeparatorType = ( {
	renderedHtml,
}: CoreSeparatorProps ) => {
	const classes = getClassNamesFromString( renderedHtml || '' ).join( ' ' );
	return <hr className={ classes } />;
};

export default CoreSeparator;
