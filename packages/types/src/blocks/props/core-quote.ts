import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreQuoteAttributes extends Record< string, unknown > {
	citation?: string;
	cssClassName?: string;
	style?: string;
}

export interface CoreQuoteProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreQuoteAttributes;
}
