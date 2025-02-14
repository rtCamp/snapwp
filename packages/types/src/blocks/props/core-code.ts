import { BlockProps } from '../base';

export interface CoreCodeAttributes extends Record< string, unknown > {
	style?: string;
	content?: string;
	cssClassName?: string;
}

export interface CoreCodeProps extends BlockProps {
	attributes?: CoreCodeAttributes;
}
