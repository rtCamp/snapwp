import type { FocalPoint } from '.';
import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreMediaTextAttributes = BaseAttributes & {
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
};

export type CoreMediaTextProps = PropsWithChildren<
	BaseProps< CoreMediaTextAttributes >
> & {
	connectedMediaItem?: CoreMediaTextConnectedMediaItem;
	renderedHtml?: string | null;
	mediaDetails?: CoreMediaTextMediaDetails;
};

export type CoreMediaText = ComponentType< CoreMediaTextProps >;

export interface CoreMediaTextConnectedMediaItem {
	node: {
		sizes: string;
	};
}

export interface CoreMediaTextMediaDetails {
	height: number;
	width: number;
}
