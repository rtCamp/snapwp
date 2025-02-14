import { BlockProps } from '../base';

export interface CorePreformattedAttributes extends Record< string, unknown > {
	content?: string;
	style?: string;
}

export interface CorePreformattedProps extends BlockProps {
	attributes?: CorePreformattedAttributes;
}
