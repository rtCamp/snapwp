import { cn, getClassNamesFromString } from '@snapwp/core';
import type {
	CoreSyncedPattern as CoreSyncedPatternType,
	CoreSyncedPatternProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/synced-pattern block.
 *
 * @param {Object}                                    props              The props for the block component.
 * @param {CoreSyncedPatternProps['attributes']}      props.attributes   Block attributes.
 * @param {ReactNode}                                 props.children     The block's children.
 * @param {CoreSyncedPatternProps['renderedHtml']}    props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreSyncedPattern: CoreSyncedPatternType = ({
	attributes,
	children,
	renderedHtml,
}: CoreSyncedPatternProps): ReactNode => {
	const { style } = attributes || {};
	const styleObject = getStylesFromAttributes({ style });

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString(renderedHtml)
		: '';
	const classNames = cn(classNamesFromString);

	return (
		<div
			className={classNames}
			{...(styleObject && { style: styleObject })}
		>
			{children}
		</div>
	);
}; 