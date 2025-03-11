import { cn, getStylesFromAttributes } from '@snapwp/core';
import type {
	CoreColumns as CoreColumnsType,
	CoreColumnsProps,
} from '@snapwp/types';

/**
 * Renders the core/columns block.
 *
 * @param {Object}                      props            The props for the block component.
 * @param {CoreColumnsProps.attributes} props.attributes Block attributes.
 * @param {ReactNode}                   props.children   The block's children.
 *
 * @return The rendered block.
 */
const CoreColumns: CoreColumnsType = ( {
	attributes,
	children,
}: CoreColumnsProps ) => {
	const { cssClassName, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );
	const classNames = cn( cssClassName );

	return (
		<div className={ classNames } style={ styleObject }>
			{ children }
		</div>
	);
};

export default CoreColumns;
