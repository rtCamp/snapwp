import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreButtonsAttributes extends Record< string, unknown > {
	cssClassName?: string;
	style?: string;
}

export interface CoreButtonsProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreButtonsAttributes;
}
