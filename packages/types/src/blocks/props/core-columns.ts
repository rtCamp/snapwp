import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreColumnsAttributes extends Record< string, unknown > {
	style?: string;
	cssClassName?: string;
}

export interface CoreColumnsProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreColumnsAttributes;
}
