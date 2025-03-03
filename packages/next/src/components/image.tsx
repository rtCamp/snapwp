import React, {
	type CSSProperties,
	type ImgHTMLAttributes,
	type PropsWithoutRef,
} from 'react';
import NextImage, { type ImageProps } from 'next/image';
import { cn } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';

interface MediaItem {
	altText?: string | null;
	mediaDetails: {
		width: number | undefined;
		height: number | undefined;
	};
}

interface ImageInterface {
	alt?: string;
	className?: string;
	fill?: boolean;
	height?: number;
	image?: MediaItem;
	priority?: boolean;
	sizes?: string;
	style?: CSSProperties;
	width?: number;
	src?: string;
	srcSet?: string;
	fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Renders an image with dynamic sizing and additional props.
 *
 * Note: The next/image component applies style { color: transparent; } to an image when it loads successfully, ensuring the alt text is hidden. If the image fails to load, this style isn’t applied, making the alt text visible instead.
 * @see https://github.com/vercel/next.js/blob/v15.1.3/packages/next/src/shared/lib/get-img-props.ts#L625
 *
 * @param props - Props for the component.
 * @param props.alt - Alt text for the image.
 * @param props.image - Media item containing image details.
 * @param props.width - Width of the image.
 * @param props.height - Height of the image.
 * @param props.className - CSS class names.
 * @param props.priority - If true, loads the image with higher priority.
 * @param props.fill - If true, fills the container.
 * @param props.src - Source URL for the image.
 *
 * @return {React.JSX.Element|null} The rendered image.
 */
export default function Image( {
	alt,
	image,
	width,
	height,
	className,
	priority,
	fill,
	src,
	...props
}: PropsWithoutRef<
	ImageInterface & ( ImageProps | ImgHTMLAttributes< HTMLImageElement > )
> ) {
	const altText = alt || image?.altText || '';
	const originalWidth = image?.mediaDetails?.width;
	const originalHeight = image?.mediaDetails?.height;

	const maxWidth = 1200; // From tailwind.config.js -- @todo get from theme.

	const imageProps: {
		width?: number;
		height?: number;
		fill?: boolean;
		sizes?: string;
	} = {};

	// Set the width and the height of the component
	if ( width && height ) {
		imageProps.width = width;
		imageProps.height = height;
	} else if ( width && originalHeight && originalWidth ) {
		imageProps.width = width;
		imageProps.height = originalHeight * ( width / originalWidth );
	} else if ( height && originalHeight && originalWidth ) {
		imageProps.width = originalWidth * ( height / originalHeight );
		imageProps.height = height;
	}

	// If there is no width or height, fill the container
	if (
		fill ||
		( ! imageProps.width && undefined !== imageProps.width ) ||
		( ! imageProps.height && undefined !== imageProps.height )
	) {
		imageProps.fill = true;
		imageProps.sizes = `(max-width: ${ Math.min(
			imageProps?.width || maxWidth,
			maxWidth
		) }px) 100vw, ${ Math.min(
			imageProps?.width || maxWidth,
			maxWidth
		) }px`;
		delete imageProps.width;
		delete imageProps.height;
	}

	// @todo replace src?.startsWith conditional check with something more robust that will incorporate both frontend/backend domain & anything in the list of allowed images domain in the config (ref: https://github.com/rtCamp/headless/pull/241#discussion_r1824274200). TBD after https://github.com/rtCamp/headless/issues/218.
	const { homeUrl } = getConfig();
	const normalizedHomeUrl = homeUrl?.replace( /https?:\/\//, '' );
	const normalizedSrc = src?.replace( /https?:\/\//, '' );

	if (
		! normalizedSrc?.startsWith( normalizedHomeUrl ) ||
		// Render the default image tag if no height/width is provided for an image.
		undefined === imageProps.width ||
		undefined === imageProps.height
	) {
		// Remove width prop if no width to image is provided.
		if ( undefined === imageProps.width ) {
			delete imageProps.width;
		}

		// Remove height prop if no height to image is provided.
		if ( undefined === imageProps.height ) {
			delete imageProps.height;
		}

		return (
			<img
				{ ...props }
				{ ...imageProps }
				className={ cn(
					className,
					imageProps?.fill && 'object-cover'
				) }
				src={ src }
				alt={ altText }
				style={ props.style }
			/>
		);
	}

	// @todo srcSet is not supported in next/image.
	// Handle them with device sizes ref - https://nextjs.org/docs/pages/api-reference/components/image#other-props
	delete props.srcSet;

	return src ? (
		<NextImage
			{ ...props }
			{ ...imageProps }
			className={ cn( className, imageProps?.fill && 'object-cover' ) }
			src={ src }
			alt={ altText }
			priority={ priority }
		/>
	) : null;
}
