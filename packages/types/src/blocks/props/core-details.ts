import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreDetailsAttributes extends Record< string, unknown > {
	style?: string;
	showContent: boolean;
	summary?: string;
}

export interface CoreDetailsProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreDetailsAttributes;
}
