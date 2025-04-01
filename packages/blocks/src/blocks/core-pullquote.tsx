import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';

import type {
	CorePullquote as CorePullquoteType,
	CorePullquoteProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/pullquote block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CorePullquote: CorePullquoteType = ( {
	attributes,
	renderedHtml,
}: CorePullquoteProps ): ReactNode => {
	const { style, pullquoteValue, citation } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<figure
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
			<blockquote>
				{ pullquoteValue && (
					<p>
						<Parse html={ pullquoteValue } />
					</p>
				) }

				{ citation && (
					<cite>
						<Parse html={ citation } />
					</cite>
				) }
			</blockquote>
		</figure>
	);
};

export default CorePullquote;
