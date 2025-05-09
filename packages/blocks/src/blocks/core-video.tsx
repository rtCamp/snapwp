import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import { Parse } from '@snapwp/next';
import type {
	CoreVideo as CoreVideoType,
	CoreVideoProps,
	TrackProps,
} from '@snapwp/types';
import type { ReactNode } from 'react';

/**
 * Renders a list of `<track>` elements for a video.
 *
 * @param {Object}            props        The props for the component.
 * @param {Array<TrackProps>} props.tracks An array of track objects containing `src`, `kind`, `srclang`, and `label`.
 *
 * @return A list of `<track>` elements or `null` if no tracks are provided.
 */
const Tracks = ( {
	tracks,
}: {
	tracks?: TrackProps[] | undefined;
} ): ReactNode => {
	if ( ! tracks || tracks.length === 0 ) {
		return null;
	}
	return (
		<>
			{ tracks.map( ( track, index ) => (
				<track
					key={ index }
					src={ track.src }
					kind={ track.kind }
					srcLang={ track.srclang }
					label={ track.label }
				/>
			) ) }
		</>
	);
};

/**
 * Renders the core/video block.
 *
 * @param {Object}                         props              The props for the block component.
 * @param {CoreVideoProps['attributes']}   props.attributes   Block attributes.
 * @param {CoreVideoProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
export const CoreVideo: CoreVideoType = ( {
	attributes,
	renderedHtml,
}: CoreVideoProps ): ReactNode => {
	const {
		autoplay,
		caption,
		controls,
		loop,
		muted,
		poster,
		src,
		videoPreload: preload,
		playsInline,
		tracks,
		style,
	} = attributes || {};

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

	// Transform tracks data to match the expected format
	const formattedTracks: TrackProps[] | undefined = tracks
		?.map( ( track ) => {
			if ( typeof track === 'string' ) {
				return {
					src: track,
					kind: 'subtitles',
					srclang: 'en',
					label: 'English',
				};
			}
			return null;
		} )
		// @ts-ignore
		.filter( ( track ): track is TrackProps => track !== null );

	return (
		<figure
			className={ classNames }
			{ ...( styleObject && { style: styleObject } ) }
		>
			<video
				autoPlay={ autoplay || undefined }
				controls={ controls || undefined }
				loop={ loop || undefined }
				muted={ muted || undefined }
				poster={ poster || undefined }
				preload={
					preload !== 'metadata' ? preload || undefined : undefined
				}
				src={ src }
				playsInline={ playsInline || undefined }
			>
				<Tracks tracks={ formattedTracks } />
			</video>

			{ caption && (
				<figcaption className="wp-element-caption">
					<Parse html={ caption } />
				</figcaption>
			) }
		</figure>
	);
};
