import React from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { BlockData } from '..';

export interface CoreAudioAttributes extends Record< string, unknown > {
	autoplay?: boolean;
	caption?: string;
	loop?: boolean;
	preload?: string;
	src?: string;
	style?: string;
}

export interface CoreAudioProps extends Omit< BlockData, 'type' > {
	attributes?: CoreAudioAttributes;
}

/**
 * Renders the core/audio block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
export default function CoreAudio( {
	attributes,
	renderedHtml,
}: CoreAudioProps ) {
	const { autoplay, caption, loop, preload, src, style } = attributes || {};

	if ( ! src ) {
		return null;
	}

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );

	return (
		<figure className={ classNames } style={ styleObject }>
			<audio
				controls
				src={ src }
				autoPlay={ autoplay || undefined }
				loop={ loop || undefined }
				preload={ preload || undefined }
			/>
			{ caption && (
				<figcaption className="wp-element-caption">
					{ caption }
				</figcaption>
			) }
		</figure>
	);
}
