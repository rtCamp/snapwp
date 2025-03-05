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

/**
 * Renders a list of `<track>` elements for a video.
 *
 * @param props - The props for the component.
 * @param props.tracks - An array of track objects containing `src`, `kind`, `srclang`, and `label`.
 *
 * @return A list of `<track>` elements or `null` if no tracks are provided.
 */
const Tracks = ( { tracks }: { tracks?: TrackProps[] } ) => {
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
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreVideo: CoreVideoType = ( {
	attributes,
	renderedHtml,
}: CoreVideoProps ) => {
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
		<figure className={ classNames } style={ styleObject }>
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

export default CoreVideo;
