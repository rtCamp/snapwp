import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreQuote as CoreQuoteType, CoreQuoteProps } from '@snapwp/types';

/**
 * Renders the core/quote block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 *
 * @return The rendered block.
 */
const CoreQuote: CoreQuoteType = ( {
	attributes,
	children,
}: CoreQuoteProps ) => {
	const { style, citation, cssClassName } = attributes || {};

	return (
		<blockquote
			className={ cssClassName || '' }
			{ ...( style && {
				style: getStylesFromAttributes( { style } ),
			} ) }
		>
			{ children }

			{ !! citation && (
				<cite>
					<Parse html={ citation } />
				</cite>
			) }
		</blockquote>
	);
};

export default CoreQuote;
