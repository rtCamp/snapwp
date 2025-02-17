import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreImageAttributes = BaseAttributes & {
	alt?: string;
	aspectRatio?: string;
	caption?: string;
	href?: string;
	linkClass?: string;
	linkTarget?: string;
	rel?: string;
	scale?: string;
	style?: string;
	title?: string;
	url?: string;
	imageHeight?: string;
	width?: string;
	sizeSlug?: string;
	lightbox?: string | null;
};

export type CoreImageProps = BaseProps< CoreImageAttributes > & {
	connectedMediaItem?: CoreImageConnectedMediaItem;
	mediaDetails?: CoreImageMediaDetails;
};

export type CoreImage = React.ComponentType< CoreImageProps >;

export interface CoreImageConnectedMediaItem {
	node: {
		databaseId: number;
		sizes: string;
	};
}

export interface CoreImageMediaDetails {
	height: number;
	width: number;
	sizes: CoreImageMediaSize[];
}

export interface CoreImageMediaSize {
	height: number;
	width: number;
	name: string;
	sourceUrl: string;
}

export interface LightBoxProp {
	enabled: boolean;
}

export interface FigureProps extends CoreImageAttributes, PropsWithChildren {
	renderedHtml?: string | null;
	classNames?: string;
}
