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
const CoreHeading: CoreHeadingType = ( {
	attributes,
}: CoreHeadingProps ): React.JSX.Element => {
	const { style, cssClassName, content, level } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	const HeadingTag = level
		? ( `h${ level }` as keyof JSX.IntrinsicElements )
		: 'div';

	return (
		<HeadingTag
			className={ cssClassName }
			{ ...( styleObject && { style: styleObject } ) }
		>
			{ !! content && <Parse html={ content } /> }
		</HeadingTag>
	);
};

export default CoreHeading;
