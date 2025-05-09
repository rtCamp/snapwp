import { getClassNamesFromString } from '@snapwp/core';
import type {
	CoreSeparator as CoreSeparatorType,
	CoreSeparatorProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/separator block.
 *
 * @param {Object}                             props              The props for the block component.
 * @param {CoreSeparatorProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreSeparator: CoreSeparatorType = ( {
	renderedHtml,
}: CoreSeparatorProps ): ReactNode => {
	const classes = getClassNamesFromString( renderedHtml || '' ).join( ' ' );
	return <hr className={ classes } />;
};
