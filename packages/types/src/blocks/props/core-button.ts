import { BlockProps } from '../base';

export interface CoreButtonAttributes extends Record< string, unknown > {
	cssClassName?: string;
	linkClassName?: string;
	linkTarget?: string;
	rel?: string;
	style?: string;
	tagName?: string;
	text?: string;
	title?: string;
	url?: string;
	buttonType?: string;
}

export interface CoreButtonProps extends BlockProps {
	attributes?: CoreButtonAttributes;
}
