import { BlockProps } from '../base';

export interface CoreFileAttributes extends Record< string, unknown > {
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
}

export interface CoreFileProps extends BlockProps {
	attributes?: CoreFileAttributes;
}
