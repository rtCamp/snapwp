import React from 'react';
import { cn, getStylesFromAttributes } from '@snapwp/core';

/**
 * Renders the core/list block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
export default function CoreList( { attributes, children }: any ) {
	const { cssClassName, ordered, reversed, start, style, type } =
		attributes || {};

	const TagName = ordered ? 'ol' : 'ul';

	const classNames = cn( cssClassName );

	const styleObject = getStylesFromAttributes( { style } );

	const combinedStyles: React.CSSProperties = {
		...styleObject,
		listStyleType: type ?? undefined,
	};

	return (
		<TagName
			style={ combinedStyles }
			className={ classNames }
			{ ...( reversed && { reversed: true } ) }
			{ ...( start && { start } ) }
		>
			{ children }
		</TagName>
	);
}
