import React from 'react';
import {
	BlockData,
	cn,
	getClassNamesFromString,
	getSpacingPresetCssVar,
	getStylesFromAttributes,
} from '@snapwp/core';

interface CoreSpacerAttributes {
	height: string;
	style?: string;
	width?: string;
}

export interface CoreSpacerProps extends BlockData {
	attributes?: CoreSpacerAttributes;
}

/**
 * Renders the core/spacer block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreSpacer( {
	attributes,
	renderedHtml,
}: CoreSpacerProps ) {
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
}
