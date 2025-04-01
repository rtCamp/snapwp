import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CoreFileAttributes = BaseAttributes & {
	displayPreview?: boolean;
	downloadButtonText?: string;
	fileId?: string;
	fileName?: string;
	href?: string;
	previewHeight: number;
	showDownloadButton: boolean;
	style?: string;
	textLinkHref?: string;
	textLinkTarget?: string;
};

export type CoreFileProps = BaseProps< CoreFileAttributes >;

export type CoreFile = ComponentType< CoreFileProps >;
