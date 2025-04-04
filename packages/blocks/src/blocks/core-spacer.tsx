import {
	cn,
	getClassNamesFromString,
	getSpacingPresetCssVar,
	getStylesFromAttributes,
} from '@snapwp/core';
import type {
	CoreSpacer as CoreSpacerType,
	CoreSpacerProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/spacer block.
 *
 * @param {Object}                          props              The props for the block component.
 * @param {CoreSpacerProps['attributes']}   props.attributes   Block attributes.
 * @param {CoreSpacerProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreSpacer: CoreSpacerType = ( {
	attributes,
	renderedHtml,
}: CoreSpacerProps ): ReactNode => {
	const { height, width, style } = attributes || {};

	const parsedStyle = style ? JSON.parse( style ) : {};
	const selfStretch = parsedStyle?.layout?.selfStretch ?? undefined;

	const finalHeight =
		selfStretch === 'fill' || selfStretch === 'fit' ? undefined : height;

	const styleObject = getStylesFromAttributes( { style } );

	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );

	const combinedStyle = {
		...styleObject,
		height: getSpacingPresetCssVar( finalHeight ),
		width: getSpacingPresetCssVar( width ),
	};

	return (
		<div
			className={ classNames }
			style={ combinedStyle }
			aria-hidden="true"
		/>
	);
};
