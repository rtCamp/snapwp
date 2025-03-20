import { cn, getStylesFromAttributes } from '@snapwp/core';
import type {
	CoreColumn as CoreColumnType,
	CoreColumnProps,
} from '@snapwp/types';

/**
 * Renders the core/column block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
const CoreColumn: CoreColumnType = ( {
	attributes,
	children,
}: CoreColumnProps ) => {
	const { cssClassName, style, width } = attributes || {};

	const classNames = cn( cssClassName );
	const styleObject = getStylesFromAttributes( { style } );

	const combinedStyles: React.CSSProperties = {
		...styleObject,
		flexBasis: width ?? undefined,
	};

	return (
		<div className={ classNames } style={ combinedStyles }>
			{ children }
		</div>
	);
};

export default CoreColumn;
