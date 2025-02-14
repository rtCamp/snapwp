import { PropsWithChildren } from 'react';
import { BlockProps } from '../base';

export interface CoreListAttributes extends Record< string, unknown > {
	cssClassName?: string;
	ordered?: boolean;
	reversed?: boolean;
	start?: number;
	style?: string;
	type?: string;
}

export interface CoreListProps extends PropsWithChildren< BlockProps > {
	attributes?: CoreListAttributes;
}
