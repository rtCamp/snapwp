import { getStylesFromAttributes } from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type { CoreQuote as CoreQuoteType, CoreQuoteProps } from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/quote block.
 *
 * @param {Object}                       props            The props for the block component.
 * @param {CoreQuoteProps['attributes']} props.attributes Block attributes.
 * @param {ReactNode}                    props.children   The block's children.
 *
 * @return The rendered block.
 */
const CoreQuote: CoreQuoteType = ( {
	attributes,
	children,
}: CoreQuoteProps ): ReactNode => {
	const { style, citation, cssClassName } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	return (
		<blockquote
			className={ cssClassName || undefined }
			{ ...( styleObject && { style: styleObject } ) }
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
