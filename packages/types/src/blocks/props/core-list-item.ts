import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreListItemAttributes extends Record< string, unknown > {
	content?: string;
	style?: string;
}

export interface CoreListItemProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreListItemAttributes;
}
