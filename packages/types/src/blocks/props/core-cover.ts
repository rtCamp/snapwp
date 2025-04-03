import type { ComponentType, ElementType, PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export interface FocalPoint {
	x: number;
	y: number;
}

export interface CoreCoverMediaDetails {
	height: number;
	width: number;
}

export interface CoreCoverConnectedMediaItem {
	node: {
		databaseId: number;
		sizes: string;
		srcSet: string;
		mediaItemUrl: string;
	};
}

export type CoreCoverAttributes = BaseAttributes & {
	alt?: string;
	backgroundType?: string;
	contentPosition?: string;
	customGradient?: string;
	customOverlayColor?: string;
	dimRatio?: number;
	focalPoint?: FocalPoint;
	gradient?: string;
	hasParallax?: boolean;
	id?: number;
	isDark?: boolean;
	isRepeated?: boolean;
	minHeight?: number;
	minHeightUnit?: string;
	overlayColor?: string;
	sizeSlug?: string;
	style?: string;
	tagName?: ElementType;
	url?: string;
	useFeaturedImage?: boolean;
};

export type CoreCoverProps = PropsWithChildren<
	BaseProps< CoreCoverAttributes >
> & {
	connectedMediaItem?: CoreCoverConnectedMediaItem;
	mediaDetails?: CoreCoverMediaDetails;
	renderedHtml?: string | null;
};

export type CoreCover = ComponentType< CoreCoverProps >;
