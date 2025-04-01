import { getClassNamesFromString } from '@snapwp/core';

import type {
	CoreSeparator as CoreSeparatorType,
	CoreSeparatorProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/separator block.
 *
 * @param props - The props for the block component.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreSeparator: CoreSeparatorType = ( {
	renderedHtml,
}: CoreSeparatorProps ): ReactNode => {
	const classes = getClassNamesFromString( renderedHtml || '' ).join( ' ' );
	return <hr className={ classes } />;
};

export default CoreSeparator;
