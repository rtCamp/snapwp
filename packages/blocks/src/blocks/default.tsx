import { Parse } from '@snapwp/next';

import type { Default as DefaultType, DefaultProps } from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the default block.
 * @param props - The props for the component.
 * @param props.renderedHtml - The rendered HTML.
 *
 * @return The rendered default block.
 */
const Default: DefaultType = ( { renderedHtml }: DefaultProps ): ReactNode => {
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
};

export default Default;
