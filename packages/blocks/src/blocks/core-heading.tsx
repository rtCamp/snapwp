import type { JSX } from 'react';
import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type {
	CoreHeading as CoreHeadingType,
	CoreHeadingProps,
} from '@snapwp/types';

/**
 * Renders the core/heading block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 *
 * @return The rendered block.
 */
const CoreHeading: CoreHeadingType = ( { attributes }: CoreHeadingProps ) => {
	const { style, cssClassName, content, level } = attributes || {};

	const HeadingTag = level
		? ( `h${ level }` as keyof JSX.IntrinsicElements )
		: 'div';

	return (
		<HeadingTag
			style={ getStylesFromAttributes( { style } ) }
			className={ cssClassName }
		>
			{ !! content && <Parse html={ content } /> }
		</HeadingTag>
	);
};

export default CoreHeading;
