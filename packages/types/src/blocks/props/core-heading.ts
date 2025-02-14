import { BlockProps } from '../base';

export interface CoreHeadingAttributes extends Record< string, unknown > {
	content?: string;
	cssClassName?: string;
	level: number;
	style?: string;
}

export interface CoreHeadingProps extends BlockProps {
	attributes?: CoreHeadingAttributes;
}
