import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import type {
	CoreGallery as CoreGalleryType,
	CoreGalleryProps,
} from '@snapwp/types';

/**
 * Renders the core/gallery block.
 *
 * @param {Object}                        props              The props for the block component.
 * @param {CoreGalleryProps.attributes}   props.attributes   Block attributes.
 * @param {ReactNode}                     props.children     The block's children.
 * @param {CoreGalleryProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreGallery: CoreGalleryType = ( {
	attributes,
	children,
	renderedHtml,
}: CoreGalleryProps ) => {
	const { caption, style } = attributes || {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const className = cn( classNamesFromString ) || undefined;

	return (
		<figure className={ className } style={ styleObject }>
			{ children }
			{ caption && (
				<figcaption className="wp-element-caption">
					{ caption }
				</figcaption>
			) }
		</figure>
	);
};

export default CoreGallery;
