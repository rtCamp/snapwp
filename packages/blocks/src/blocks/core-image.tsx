import { decode } from 'html-entities';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Image, Link, Parse } from '@snapwp/next';

import type {
	CoreImage as CoreImageType,
	CoreImageAttributes,
	CoreImageConnectedMediaItem,
	CoreImageMediaDetails,
	CoreImageProps,
	FigureProps,
	LightBoxProp,
} from '@snapwp/types';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';

/**
 * Renders a figure element with optional link and caption.
 *
 * @param {Object}                      props              The properties for the figure element.
 * @param {ReactNode}                   props.children     The children of the figure element.
 * @param {FigureProps['classNames']}   props.classNames   The class names for the figure element.
 * @param {FigureProps['renderedHtml']} props.renderedHtml The rendered HTML.
 * @param {FigureProps['href']}         props.href         The href for the link.
 * @param {FigureProps['linkClass']}    props.linkClass    The class for the link.
 * @param {FigureProps['linkTarget']}   props.linkTarget   The target for the link.
 * @param {FigureProps['rel']}          props.rel          The rel for the link.
 * @param {FigureProps['lightbox']}     props.lightbox     The lightbox attribute.
 *
 * @return The rendered figure element.
 */
const Figure = ( {
	children,
	classNames,
	renderedHtml,
	href,
	linkClass,
	linkTarget,
	rel,
	lightbox,
}: FigureProps ): ReactNode => {
	let props: ComponentProps< 'figure' > = {};

	if ( isLightboxEnabled( lightbox ) ) {
		props = extractInteractivityAttributesForElement(
			'figure',
			renderedHtml
		);
	}

	return (
		<figure className={ classNames } { ...props }>
			{ href ? (
				<Link
					href={ href }
					className={ linkClass }
					target={ linkTarget }
					rel={ rel }
				>
					{ children }
				</Link>
			) : (
				children
			) }
		</figure>
	);
};

/**
 * Renders a core image block with optional link and caption.
 *
 * @todo Expose context and state to frontend for lightbox functionality.
 *
 * @param {Object}                               props                    The properties for the core image block.
 * @param {CoreImageProps['attributes']}         props.attributes         The attributes for the image.
 * @param {CoreImageProps['connectedMediaItem']} props.connectedMediaItem The connected media item.
 * @param {CoreImageProps['mediaDetails']}       props.mediaDetails       The media details.
 * @param {CoreImageProps['renderedHtml']}       props.renderedHtml       The rendered HTML.
 *
 * @return The rendered core image block or null if no URL is provided.
 */
export const CoreImage: CoreImageType = ( {
	attributes,
	connectedMediaItem,
	mediaDetails,
	renderedHtml,
}: CoreImageProps ): ReactNode => {
	// @todo: fetchPriority is missing
	const { caption, url, lightbox } = attributes || {};

	if ( ! url ) {
		return null;
	}

	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );

	const imageProps = getImageProps(
		attributes,
		connectedMediaItem,
		mediaDetails
	);

	let imgInteractiveAttributes = {};

	if ( isLightboxEnabled( lightbox ) ) {
		imgInteractiveAttributes = extractInteractivityAttributesForElement(
			'img',
			renderedHtml
		);
	}

	let buttonAriaAttributes = {};

	if ( isLightboxEnabled( lightbox ) ) {
		// Need to extract it because ARIA Label attribute is dynamic in PHP.
		buttonAriaAttributes = extractAriaAttributesForElement(
			'button',
			renderedHtml
		);
	}

	return (
		<Figure
			renderedHtml={ renderedHtml }
			classNames={ classNames }
			{ ...attributes }
		>
			<Image { ...imageProps } { ...imgInteractiveAttributes } />
			{ isLightboxEnabled( lightbox ) && (
				<button
					className="lightbox-trigger"
					type="button"
					data-wp-init="callbacks.initTriggerButton"
					data-wp-on-async--click="actions.showLightbox"
					data-wp-style--right="state.imageButtonRight"
					data-wp-style--top="state.imageButtonTop"
					{ ...buttonAriaAttributes }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						fill="none"
						viewBox="0 0 12 12"
					>
						<path
							fill="#fff"
							d="M2 0a2 2 0 0 0-2 2v2h1.5V2a.5.5 0 0 1 .5-.5h2V0H2Zm2 10.5H2a.5.5 0 0 1-.5-.5V8H0v2a2 2 0 0 0 2 2h2v-1.5ZM8 12v-1.5h2a.5.5 0 0 0 .5-.5V8H12v2a2 2 0 0 1-2 2H8Zm2-12a2 2 0 0 1 2 2v2h-1.5V2a.5.5 0 0 0-.5-.5H8V0h2Z"
						/>
					</svg>
				</button>
			) }

			{ caption && (
				<figcaption className="wp-element-caption">
					<Parse html={ caption } />
				</figcaption>
			) }
		</Figure>
	);
};

/**
 * Returns the props for the image component.
 *
 * @param {CoreImageAttributes}         attributes         The attributes for the image.
 * @param {CoreImageConnectedMediaItem} connectedMediaItem The connected media item.
 * @param {CoreImageMediaDetails}       mediaDetails       The media details.
 *
 * @return The props for the image component.
 */
const getImageProps = (
	attributes?: CoreImageAttributes,
	connectedMediaItem?: CoreImageConnectedMediaItem,
	mediaDetails?: CoreImageMediaDetails
): ComponentProps< typeof Image > => {
	const {
		alt,
		aspectRatio,
		scale,
		style,
		title,
		url,
		imageHeight,
		width: imageWidth,
		sizeSlug,
	} = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	const imageStyles: CSSProperties = {
		...styleObject,
		aspectRatio,
		objectFit: scale as CSSProperties[ 'objectFit' ],
	};

	const imageProps: ComponentProps< typeof Image > = {
		title,
		alt,
		src: url,
	};

	if ( connectedMediaItem?.node ) {
		imageProps.sizes = connectedMediaItem.node.sizes;
		imageProps.className = `wp-image-${ connectedMediaItem.node.databaseId }`;
	}

	// WordPress may not hydrate height/width correctly, so we need to ensure they are set.
	if ( mediaDetails ) {
		if ( sizeSlug ) {
			const size = mediaDetails.sizes?.find(
				( _size ) => _size.name === sizeSlug
			);
			if ( size ) {
				imageProps.width = size.width;
				imageProps.height = size.height;
			} else {
				imageProps.width = mediaDetails.width;
				imageProps.height = mediaDetails.height;
			}
		} else {
			imageProps.width = mediaDetails.width;
			imageProps.height = mediaDetails.height;
		}
	}

	if ( imageWidth ) {
		imageStyles.width = imageWidth;
	}

	if ( imageHeight ) {
		imageStyles.height = imageHeight;
	}

	imageProps.style = imageStyles;
	return imageProps;
};

/**
 * Is Lightbox enabled for the image. If enabled the <LightboxOverlay> component will be added in the template renderer.
 *
 * @param {string} lightbox The lightbox attribute.
 * @todo colocate the lightbox overlay here and portal it where needed
 *
 * @return Whether the lightbox is enabled.
 */
const isLightboxEnabled = ( lightbox?: string | null ): boolean => {
	if ( ! lightbox ) {
		return false;
	}
	const lightboxObj = JSON.parse( lightbox ) as LightBoxProp;

	return lightboxObj.enabled;
};

/**
 * Extracts interactivity attributes from the rendered HTML for a given element.
 *
 * @param {string} element      The element to extract attributes for.
 * @param {string} renderedHtml The rendered HTML.
 *
 * @return The extracted interactivity attributes.
 */
const extractInteractivityAttributesForElement = (
	element: string,
	renderedHtml?: string | null | undefined
): Record< string, string > => {
	if ( ! renderedHtml ) {
		return {};
	}

	const regex = new RegExp( `<${ element }([^>]*data-wp-[^>]*)>`, 'g' );
	const dataAttributesRegex = /data-wp-([\w-]+)="([^"]*)"/g;
	const result: Record< string, string > = {};

	let match;
	while ( ( match = regex.exec( renderedHtml ) ) !== null ) {
		const [ , attributes ] = match;
		let dataMatch;

		if ( ! attributes ) {
			continue;
		}

		while (
			( dataMatch = dataAttributesRegex.exec( attributes ) ) !== null
		) {
			const [ , key, value ] = dataMatch;
			result[ `data-wp-${ key }` ] = decode( value );
		}
	}

	return result;
};

/**
 * Extracts ARIA attributes from the rendered HTML for a given element.
 *
 * @param {string} element      The element to extract attributes for.
 * @param {string} renderedHtml The rendered HTML.
 *
 * @return The extracted ARIA attributes.
 */
const extractAriaAttributesForElement = (
	element: string,
	renderedHtml?: string | null
): Record< string, string > => {
	if ( ! renderedHtml ) {
		return {};
	}

	const regex = new RegExp( `<${ element }([^>]*aria-[^>]*)>`, 'g' );
	const dataAttributesRegex = /aria-([\w-]+)="([^"]*)"/g;
	const result: Record< string, string > = {};

	let match;
	while ( ( match = regex.exec( renderedHtml ) ) !== null ) {
		const [ , attributes ] = match;
		let dataMatch;

		if ( ! attributes ) {
			continue;
		}

		while (
			( dataMatch = dataAttributesRegex.exec( attributes ) ) !== null
		) {
			const [ , key, value ] = dataMatch;
			result[ `aria-${ key }` ] = decode( value );
		}
	}

	return result;
};
