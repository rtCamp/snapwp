'use client'

import NextImage, { type ImageProps } from 'next/image';
import { cn } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';

import type {
	CSSProperties,
	ImgHTMLAttributes,
	PropsWithoutRef,
	ReactNode,
} from 'react';

interface MediaItem {
	altText?: string | null;
	mediaDetails: {
		width: number | undefined;
		height: number | undefined;
	};
}

interface ImageInterface {
	alt?: string | undefined;
	className?: string | undefined;
	fill?: boolean;
	height?: number | undefined;
	image?: MediaItem;
	priority?: boolean;
	sizes?: string;
	style?: CSSProperties | undefined;
	width?: number | undefined;
	src?: string | undefined;
	srcSet?: string;
	fetchPriority?: 'high' | 'low' | 'auto'; // ✅ Already present
}

/**
 * Renders an image with dynamic sizing and additional props.
 */
export function Image({
	alt,
	image,
	width,
	height,
	className,
	priority,
	fill,
	src,
	fetchPriority, // ✅ Destructure this
	...props
}: PropsWithoutRef<
	ImageInterface & (ImageProps | ImgHTMLAttributes<HTMLImageElement>)
>): ReactNode {
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
	if (width && height) {
		imageProps.width = width;
		imageProps.height = height;
	} else if (width && originalHeight && originalWidth) {
		imageProps.width = width;
		imageProps.height = originalHeight * (width / originalWidth);
	} else if (height && originalHeight && originalWidth) {
		imageProps.width = originalWidth * (height / originalHeight);
		imageProps.height = height;
	}

	// If there is no width or height, fill the container
	if (
		fill ||
		(imageProps.width === undefined) ||
		(imageProps.height === undefined)
	) {
		imageProps.fill = true;
		imageProps.sizes = `(max-width: ${Math.min(
			imageProps?.width || maxWidth,
			maxWidth
		)}px) 100vw, ${Math.min(
			imageProps?.width || maxWidth,
			maxWidth
		)}px`;
		delete imageProps.width;
		delete imageProps.height;
	}

	const { wpHomeUrl } = getConfig();
	const normalizedHomeUrl = wpHomeUrl?.replace(/https?:\/\//, '');
	const normalizedSrc = src?.replace(/https?:\/\//, '');

	if (
		!normalizedSrc?.startsWith(normalizedHomeUrl) ||
		imageProps.width === undefined ||
		imageProps.height === undefined
	) {
		if (imageProps.width === undefined) {
			delete imageProps.width;
		}
		if (imageProps.height === undefined) {
			delete imageProps.height;
		}

		return (
			<img
				{...props}
				{...imageProps}
				className={cn(className, imageProps?.fill && 'object-cover')}
				src={src}
				alt={altText}
				style={props.style}
			/>
		);
	}

	delete props.srcSet;

	// ✅ Add fetchPriority here:
	return src ? (
		<NextImage
			{...props}
			{...imageProps}
			className={cn(className, imageProps?.fill && 'object-cover')}
			src={src}
			alt={altText}
			{...(priority && { priority })}
			{...(fetchPriority && { fetchPriority })} {/* ✅ This line enables it */}
		/>
	) : null;
}
