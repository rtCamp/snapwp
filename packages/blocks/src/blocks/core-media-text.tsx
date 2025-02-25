import React, { type ComponentProps } from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Image, Link, Parse } from '@snapwp/next';
import type {
	CoreMediaText as CoreMediaTextType,
	CoreMediaTextProps,
	FocalPoint,
} from '@snapwp/types';

/**
 * Default width for media content as percentage
 */
const DEFAULT_MEDIA_WIDTH = 50;

/**
 * Default WordPress media size slug
 */
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

/**
 * Generates CSS styles for image fill based on the provided URL and focal point.
 *
 * @param {string}       url          The URL of the image.
 * @param {FocalPoint}   focalPoint   The focal point of the image.
 * @param {FocalPoint.x} focalPoint.x The x-coordinate of the focal point (0 to 1).
 * @param {FocalPoint.y} focalPoint.y The y-coordinate of the focal point (0 to 1).
 *
 * @return CSS styles for the image fill.
 */
function imageFillStyles( url?: string, focalPoint?: FocalPoint ) {
	return url
		? {
				objectPosition: focalPoint
					? `${ Math.round( focalPoint.x * 100 ) }% ${ Math.round(
							focalPoint.y * 100
					  ) }%`
					: `50% 50%`,
		  }
		: {};
}

/**
 * Renders a WordPress Media & Text block with support for images, videos, and linked media
 *
 * @param {Object}                                props                    Component props
 * @param {CoreMediaTextProps.attributes}         props.attributes         Block configuration attributes
 * @param {ReactNode}                             props.children           Child components to render
 * @param {CoreMediaTextProps.renderedHtml}       props.renderedHtml       Raw HTML string from WordPress
 * @param {CoreMediaTextProps.connectedMediaItem} props.connectedMediaItem Connected media item
 * @param {CoreMediaTextProps.mediaDetails}       props.mediaDetails       Media details
 *
 * @return Rendered component or null if no content
 */
const CoreMediaText: CoreMediaTextType = ( {
	attributes = {},
	children,
	renderedHtml,
	connectedMediaItem,
	mediaDetails,
}: CoreMediaTextProps ) => {
	// If there is no media URL or children, render the parsed HTML
	if ( ! attributes?.mediaUrl && ! children ) {
		return <Parse html={ renderedHtml || '' } />;
	}

	const {
		focalPoint,
		href,
		imageFill,
		linkClass,
		linkTarget,
		mediaAlt,
		mediaId,
		mediaPosition,
		mediaType,
		mediaUrl,
		rel,
		style,
	} = attributes || {};

	const mediaSizeSlug = attributes?.mediaSizeSlug || DEFAULT_MEDIA_SIZE_SLUG;
	// We set this explicitly so if mediaWidth is undefined, gridTemplateColumns will still get generated.
	const mediaWidth = attributes?.mediaWidth || DEFAULT_MEDIA_WIDTH;

	const newRel = ! rel ? undefined : rel;

	const imageClasses = cn( {
		[ `wp-image-${ mediaId }` ]: mediaId && mediaType === 'image',
		[ `size-${ mediaSizeSlug }` ]: mediaId && mediaType === 'image',
	} );

	const positionStyles = imageFill
		? imageFillStyles( mediaUrl, focalPoint )
		: {};

	// @todo Get from the attributes when Content Blocks supports it.
	const imageProps: ComponentProps< typeof Image > = {};
	if ( connectedMediaItem?.node ) {
		imageProps.sizes = connectedMediaItem.node.sizes;
	}

	if ( mediaDetails ) {
		imageProps.height = mediaDetails.height;
		imageProps.width = mediaDetails.width;
	}

	let image = mediaUrl ? (
		<Image
			{ ...imageProps }
			src={ mediaUrl }
			alt={ mediaAlt }
			className={ imageClasses }
			style={ positionStyles }
		/>
	) : null;

	if ( href ) {
		image = (
			<Link
				className={ linkClass }
				href={ href }
				target={ linkTarget }
				rel={ newRel }
			>
				{ image }
			</Link>
		);
	}

	const mediaTypeRenders = {
		image,
		video: <video controls src={ mediaUrl } />,
	};

	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const styleObject = getStylesFromAttributes( { style } );

	let gridTemplateColumns;
	if ( mediaWidth !== DEFAULT_MEDIA_WIDTH ) {
		gridTemplateColumns =
			'right' === mediaPosition
				? `auto ${ mediaWidth }%`
				: `${ mediaWidth }% auto`;
	}

	const gridStyle = {
		...styleObject,
		gridTemplateColumns,
	};

	if ( mediaPosition === 'right' ) {
		return (
			<div className={ cn( classNamesFromString ) } style={ gridStyle }>
				<div className="wp-block-media-text__content">{ children }</div>

				<figure className="wp-block-media-text__media">
					{ mediaType && mediaTypeRenders[ mediaType ] }
				</figure>
			</div>
		);
	}

	return (
		<div className={ cn( classNamesFromString ) } style={ gridStyle }>
			<figure className="wp-block-media-text__media">
				{ mediaType && mediaTypeRenders[ mediaType ] }
			</figure>

			<div className="wp-block-media-text__content">{ children }</div>
		</div>
	);
};

export default CoreMediaText;
