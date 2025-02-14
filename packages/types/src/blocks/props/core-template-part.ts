import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreTemplatePartAttributes extends Record< string, unknown > {
	templatePartTagName?: string;
}

export interface CoreTemplatePartProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreTemplatePartAttributes;
}
