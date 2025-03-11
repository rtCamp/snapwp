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

/**
 * Renders the core/spacer block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreSpacer: CoreSpacerType = ( {
	attributes,
	renderedHtml,
}: CoreSpacerProps ) => {
	const { height, width, style } = attributes || {};

	const parsedStyle = style ? JSON.parse( style ) : {};
	const selfStretch = parsedStyle?.layout?.selfStretch ?? undefined;

	const finalHeight =
		selfStretch === 'fill' || selfStretch === 'fit' ? undefined : height;

	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );

	const combinedStyle = {
		...( style && getStylesFromAttributes( { style } ) ),
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

export default CoreSpacer;
