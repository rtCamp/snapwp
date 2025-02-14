import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';
import { FocalPoint } from '.';

export interface CoreMediaTextProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreMediaTextAttributes;
	connectedMediaItem?: CoreMediaTextConnectedMediaItem;
	renderedHtml?: string | null;
	mediaDetails?: CoreMediaTextMediaDetails;
}

export interface CoreMediaTextAttributes extends Record< string, unknown > {
	href?: string;
	linkClass?: string;
	linkTarget?: string;
	mediaAlt?: string;
	mediaId?: number;
	mediaPosition?: 'left' | 'right';
	mediaSizeSlug?: string;
	mediaType?: 'image' | 'video';
	mediaUrl?: string;
	mediaWidth?: number;
	rel?: string;
	style?: string;
	imageFill?: boolean;
	focalPoint?: FocalPoint;
}

export interface CoreMediaTextConnectedMediaItem {
	node: {
		sizes: string;
	};
}

export interface CoreMediaTextMediaDetails {
	height: number;
	width: number;
}
