// From https://github.com/blakewilson/faust-gutenberg-decode-demo/blob/main/utils/getImageSizeProps.js

import getPxForSizeAttribute from './get-px-for-size-attribute';

export type ImageSizeAttributes = {
	sizeSlug?: string | undefined;
	width?: string | undefined;
	height?: string | undefined;
};

// @todo These should be sourced from the theme.
const imageSizeToWidth: {
	[ key: string ]: number;
} = {
	thumbnail: 150,
	medium: 300,
	large: 600,
	'full-size': 2560,
};

const imageSizeToHeight: {
	[ key: string ]: number;
} = {
	thumbnail: 150,
	medium: 300,
	large: 600,
	'full-size': 2560,
};

/**
 * Retrieves the width and height based on image attributes.
 *
 * @param attributes - Image size attributes including sizeSlug, width, and height.
 * @return An object containing the width and height in pixels.
 *
 * @internal
 */
export default function getImageSizeFromAttributes(
	attributes: ImageSizeAttributes
): {
	width: number | undefined;
	height: number | undefined;
} {
	const sizeSlug = attributes?.sizeSlug;

	const widthPx = attributes?.width
		? getPxForSizeAttribute( attributes?.width )
		: undefined;

	const heightPx = attributes?.height
		? getPxForSizeAttribute( attributes?.height )
		: undefined;

	if ( sizeSlug ) {
		return {
			width: widthPx ?? imageSizeToWidth[ sizeSlug ],
			height: heightPx ?? imageSizeToHeight[ sizeSlug ],
		};
	}

	return {
		width: widthPx ?? undefined, // return undefined if no width to image is provided.
		height: heightPx ?? undefined, // return undefined if no height to image is provided.
	};
}
