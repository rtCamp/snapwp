import { BlockProps } from '../base';

export interface TrackProps {
	src: string;
	kind: string;
	srclang: string;
	label: string;
}

export interface CoreVideoAttributes extends Record< string, unknown > {
	autoplay?: boolean;
	caption?: string;
	controls: boolean;
	loop?: boolean;
	muted?: boolean;
	playsInline?: boolean;
	poster?: string;
	src?: string;
	style?: string;
	tracks: Array< any >;
	videoPreload: string;
}

export interface CoreVideoProps extends BlockProps {
	attributes?: CoreVideoAttributes;
}
