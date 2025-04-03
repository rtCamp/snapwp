import { cn, getStylesFromAttributes } from '@snapwp/core';
import type {
	CoreButtons as CoreButtonsType,
	CoreButtonsProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/buttons block.
 *
 * @param {Object}                         props            The props for the block component.
 * @param {CoreButtonsProps['attributes']} props.attributes Block attributes.
 * @param {ReactNode}                      props.children   The block's children.
 *
 * @return The rendered block.
 */
const CoreButtons: CoreButtonsType = ( {
	attributes,
	children,
}: CoreButtonsProps ): ReactNode => {
	const { cssClassName, style } = attributes || {};
	const classNames = cn( cssClassName );

	const styleObject = getStylesFromAttributes( { style } );

	return (
		<div
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
			{ children }
		</div>
	);
};

export default CoreButtons;
