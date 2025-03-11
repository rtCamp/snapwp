import type { ComponentProps } from 'react';
import {
	getStylesFromAttributes,
	findElementAndGetClassNames,
	getColorClassName,
	cn,
} from '@snapwp/core';
import { Image, Parse } from '@snapwp/next';
import type {
	CoreCover as CoreCoverType,
	CoreCoverProps,
	FocalPoint,
} from '@snapwp/types';

const IMAGE_BACKGROUND_TYPE = 'image';
const VIDEO_BACKGROUND_TYPE = 'video';
const DEFAULT_FOCAL_POINT = { x: 0.5, y: 0.5 };

/**
 * Get media position from focal point.
 *
 * @see https://github.com/WordPress/gutenberg/blob/887243c1cb2b3280934fbff05d4af8e46a3feddc/packages/block-library/src/cover/shared.js#L27
 *
 * @param focalPoint - The focal point coordinates object containing x and y values.
 *
 * @return {string} CSS position string or undefined if no focal point
 */
const mediaPosition = ( focalPoint?: FocalPoint | null ): string => {
	if ( ! focalPoint ) {
		focalPoint = DEFAULT_FOCAL_POINT;
	}

	const { x = DEFAULT_FOCAL_POINT.x, y = DEFAULT_FOCAL_POINT.y } = focalPoint;
	return `${ Math.round( x * 100 ) }% ${ Math.round( y * 100 ) }%`;
};

/**
 * Renders the core/cover block.
 * @param root0 - The component props object
 * @param root0.attributes - Block attributes including styling and media settings
 * @param root0.children - Child elements to render inside the cover
 * @param root0.renderedHtml - Pre-rendered HTML string for class extraction
 * @param root0.connectedMediaItem - The connected media item object
 * @param root0.mediaDetails - The media details object
 *
 * @return {React.JSX.Element} The rendered cover block or null if using featured image
 */
const CoreCover: CoreCoverType = ( {
	attributes,
	connectedMediaItem,
	mediaDetails,
	children,
	renderedHtml,
}: CoreCoverProps ) => {
	// Rest of the component implementation remains unchanged
	const {
		alt,
		backgroundType,
		customGradient,
		customOverlayColor,
		focalPoint,
		hasParallax,
		isRepeated,
		minHeight: minHeightProp,
		minHeightUnit,
		overlayColor,
		style,
		tagName: Tag = 'div',
		url: originalUrl,
		useFeaturedImage,
	} = attributes || {};

	// @todo use the `url` attribute when Content Blocks populates it correctly for featured images.
	const url = originalUrl || connectedMediaItem?.node?.mediaItemUrl;
	if ( useFeaturedImage && ! url ) {
		// Fallback to parsing the rendered HTML.
		return <Parse html={ renderedHtml || '' } />;
	}

	// Using utility function so in future if WordPress changes it's logic, we can update the utility function.
	const overlayColorClass = getColorClassName(
		'background-color',
		overlayColor
	);

	const minHeight =
		minHeightProp && minHeightUnit
			? `${ minHeightProp }${ minHeightUnit }`
			: minHeightProp;

	const isImageBackground = backgroundType === IMAGE_BACKGROUND_TYPE;
	const isVideoBackground = backgroundType === VIDEO_BACKGROUND_TYPE;

	const isImgElement = ! ( hasParallax || isRepeated );

	const styleObject = {
		...getStylesFromAttributes( { style } ),
		minHeight: minHeight || undefined,
	};

	const bgStyle = {
		backgroundColor: ! overlayColorClass ? customOverlayColor : undefined,
		background: customGradient || undefined,
	};

	const objectPosition =
		focalPoint && isImgElement ? mediaPosition( focalPoint ) : undefined;

	const backgroundImage = url ? `url(${ url })` : undefined;
	const backgroundPosition = mediaPosition( focalPoint );

	const classNamesFromString = findElementAndGetClassNames( renderedHtml );

	const imgClasses = findElementAndGetClassNames(
		renderedHtml,
		'.wp-block-cover__image-background'
	);

	// Hydrate additional image props we can't (yet) get from the Attributes.
	const imageProps: ComponentProps< typeof Image > = {};

	if ( isImageBackground && url && connectedMediaItem?.node ) {
		imageProps.sizes = connectedMediaItem.node.sizes;
		imageProps.srcSet = connectedMediaItem.node.srcSet;
	}

	if ( isImageBackground && url && mediaDetails ) {
		imageProps.width = mediaDetails.width;
		imageProps.height = mediaDetails.height;
	}

	const innerContainerClassNames = findElementAndGetClassNames(
		renderedHtml,
		'.wp-block-cover__inner-container'
	);

	const overlayClassNames = findElementAndGetClassNames(
		renderedHtml,
		'.wp-block-cover__background'
	);

	return (
		<Tag className={ classNamesFromString } style={ styleObject }>
			{ isImageBackground &&
				url &&
				( isImgElement ? (
					<Image
						{ ...imageProps }
						className={ imgClasses }
						alt={ alt }
						src={ url }
						style={ { objectPosition } }
						data-object-fit="cover"
						data-object-position={ objectPosition }
					/>
				) : (
					<div
						role={ alt ? 'img' : undefined }
						aria-label={ alt || undefined }
						className={ imgClasses }
						style={ { backgroundPosition, backgroundImage } }
					/>
				) ) }
			{ isVideoBackground && url && (
				<video
					className={ cn(
						'wp-block-cover__video-background',
						'intrinsic-ignore'
					) }
					autoPlay
					muted
					loop
					playsInline
					src={ url }
					style={ { objectPosition } }
					data-object-fit="cover"
					data-object-position={ objectPosition }
				/>
			) }
			<span
				aria-hidden="true"
				className={ overlayClassNames }
				style={ bgStyle }
			/>
			<div className={ innerContainerClassNames }>{ children }</div>
		</Tag>
	);
};

export default CoreCover;
