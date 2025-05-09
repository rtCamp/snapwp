import type { BaseAttributes, BaseProps } from '..';
import type { ComponentType } from 'react';

export interface TrackProps {
	src: string;
	kind: string;
	srclang: string;
	label: string;
}

export type CoreVideoAttributes = BaseAttributes & {
	autoplay?: boolean;
	caption?: string;
	controls: boolean;
	loop?: boolean;
	muted?: boolean;
	playsInline?: boolean;
	poster?: string;
	src?: string;
	style?: string;
	tracks: Array< Object | string >;
	videoPreload: string;
};

export type CoreVideoProps = BaseProps< CoreVideoAttributes >;

export type CoreVideo = ComponentType< CoreVideoProps >;
