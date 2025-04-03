import { cn, getClassNamesFromString } from '@snapwp/core';
import type {
	CorePostContent as CorePostContentType,
	CorePostContentProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/post-content block.
 *
 * @param {Object}                            props              The props for the block component.
 * @param {ReactNode}                         props.children     The block's children.
 * @param {CorePostContentProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CorePostContent: CorePostContentType = ( {
	renderedHtml,
	children,
}: CorePostContentProps ): ReactNode => {
	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );
	return <div className={ classNames }>{ children }</div>;
};

export default CorePostContent;
