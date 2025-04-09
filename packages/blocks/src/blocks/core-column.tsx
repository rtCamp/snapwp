import { cn, getStylesFromAttributes } from '@snapwp/core';
import type {
	CoreColumn as CoreColumnType,
	CoreColumnProps,
} from '@snapwp/types';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Renders the core/column block.
 *
 * @param {Object}                        props            The props for the block component.
 * @param {CoreColumnProps['attributes']} props.attributes Block attributes.
 * @param {ReactNode}                     props.children   The block's children.
 *
 * @return The rendered block.
 */
export const CoreColumn: CoreColumnType = ( {
	attributes,
	children,
}: CoreColumnProps ): ReactNode => {
	const { cssClassName, style, width } = attributes || {};

	const classNames = cn( cssClassName );
	const styleObject = getStylesFromAttributes( { style } );

	const combinedStyles: CSSProperties = {
		...styleObject,
		flexBasis: width ?? undefined,
	};

	return (
		<div className={ classNames } style={ combinedStyles }>
			{ children }
		</div>
	);
};
