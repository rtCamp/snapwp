import { Parse } from '@snapwp/next';
import type { CoreHtml as CoreHtmlType, CoreHtmlProps } from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/html block.
 *
 * @param {Object}                        props              The props for the block component.
 * @param {CoreHtmlProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreHtml: CoreHtmlType = ( {
	renderedHtml,
}: CoreHtmlProps ): ReactNode => {
	// @todo use attributes.content instead of renderedHtml once it's available
	if ( ! renderedHtml ) {
		return null;
	}

	return <Parse html={ renderedHtml } />;
};

export default CoreHtml;
