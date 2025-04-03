import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CoreParagraphAttributes = BaseAttributes & {
	backgroundColor?: string;
	content?: string;
	cssClassName?: string;
	direction?: string;
	fontFamily?: string;
	fontSize?: string;
	style?: string | undefined;
	textColor?: string;
};

export type CoreParagraphProps = BaseProps< CoreParagraphAttributes >;

export type CoreParagraph = ComponentType< CoreParagraphProps >;
