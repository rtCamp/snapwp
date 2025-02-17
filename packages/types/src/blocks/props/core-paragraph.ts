import type { BaseAttributes, BaseProps } from '../base';

export type CoreParagraphAttributes = BaseAttributes & {
	backgroundColor?: string;
	content?: string;
	cssClassName?: string;
	direction?: string;
	fontFamily?: string;
	fontSize?: string;
	style?: string;
	textColor?: string;
};

export type CoreParagraphProps = BaseProps< CoreParagraphAttributes >;

export type CoreParagraph = React.ComponentType< CoreParagraphProps >;
