import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreGalleryAttributes extends Record< string, unknown > {
	caption?: string;
	style?: string;
}

export interface CoreGalleryProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreGalleryAttributes;
}
