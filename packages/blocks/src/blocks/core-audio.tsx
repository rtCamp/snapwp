import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import type { CoreAudio as CoreAudioType, CoreAudioProps } from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders the core/audio block.
 *
 * @param {Object}                         props              The props for the block component.
 * @param {CoreAudioProps['attributes']}   props.attributes   Block attributes.
 * @param {CoreAudioProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreAudio: CoreAudioType = ( {
	attributes,
	renderedHtml,
}: CoreAudioProps ): ReactNode => {
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
		<figure
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
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
};
