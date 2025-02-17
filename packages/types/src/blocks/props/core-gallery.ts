import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreGalleryAttributes = BaseAttributes & {
	caption?: string;
	style?: string;
};

export type CoreGalleryProps = PropsWithChildren<
	BaseProps< CoreGalleryAttributes >
>;

export type CoreGallery = React.ComponentType< CoreGalleryProps >;
