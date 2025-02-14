import { BlockProps } from '../base';

export interface CoreParagraphAttributes extends Record< string, unknown > {
	backgroundColor?: string;
	content?: string;
	cssClassName?: string;
	direction?: string;
	fontFamily?: string;
	fontSize?: string;
	style?: string;
	textColor?: string;
}

export interface CoreParagraphProps extends BlockProps {
	attributes?: CoreParagraphAttributes;
}
