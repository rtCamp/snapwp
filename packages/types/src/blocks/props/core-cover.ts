import { ElementType, PropsWithChildren } from 'react';
import { BlockProps } from '../base';

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

export interface CoreCoverAttributes extends Record< string, unknown > {
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
}

export interface CoreCoverProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreCoverAttributes;
	connectedMediaItem?: CoreCoverConnectedMediaItem;
	mediaDetails?: CoreCoverMediaDetails;
	renderedHtml?: string | null;
}
