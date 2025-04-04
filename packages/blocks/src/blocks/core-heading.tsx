import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type {
	CoreHeading as CoreHeadingType,
	CoreHeadingProps,
} from '@snapwp/types';
import type { JSX, ReactNode } from 'react';

/**
 * Renders the core/heading block.
 *
 * @param {Object}                         props            The props for the block component.
 * @param {CoreHeadingProps['attributes']} props.attributes Block attributes.
 *
 * @return The rendered block.
 */
const CoreHeading: CoreHeadingType = ( {
	attributes,
}: CoreHeadingProps ): ReactNode => {
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
