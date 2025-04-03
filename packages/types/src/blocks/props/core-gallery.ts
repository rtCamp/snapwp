import type { ComponentType, PropsWithChildren } from 'react';

import type { BaseAttributes, BaseProps } from '../base';

export type CoreGalleryAttributes = BaseAttributes & {
	caption?: string;
	style?: string;
};

export type CoreGalleryProps = PropsWithChildren<
	BaseProps< CoreGalleryAttributes >
>;

export type CoreGallery = ComponentType< CoreGalleryProps >;
