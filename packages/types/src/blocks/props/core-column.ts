import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreColumnAttributes extends Record< string, unknown > {
	style?: string;
	width?: string;
	cssClassName?: string;
}

export interface CoreColumnProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreColumnAttributes;
}
