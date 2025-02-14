import { BlockProps } from '../base';

export interface CoreAudioAttributes extends Record< string, unknown > {
	autoplay?: boolean;
	caption?: string;
	loop?: boolean;
	preload?: string;
	src?: string;
	style?: string;
}

export interface CoreAudioProps extends BlockProps {
	attributes?: CoreAudioAttributes;
}
