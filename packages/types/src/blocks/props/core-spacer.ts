import { BlockProps } from '../base';

export interface CoreSpacerAttributes extends Record< string, unknown > {
	height: string;
	style?: string;
	width?: string;
}

export interface CoreSpacerProps extends BlockProps {
	attributes?: CoreSpacerAttributes;
}
