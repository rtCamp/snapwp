import type { ComponentType } from 'react';
import type { BaseAttributes, BaseProps } from '..';

export type CoreAudioAttributes = BaseAttributes & {
	autoplay?: boolean;
	caption?: string;
	loop?: boolean;
	preload?: string;
	src?: string;
	style?: string;
};

export type CoreAudioProps = BaseProps< CoreAudioAttributes >;

export type CoreAudio = ComponentType< CoreAudioProps >;
