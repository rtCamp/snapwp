import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CoreHeadingAttributes = BaseAttributes & {
	content?: string;
	cssClassName?: string;
	level: number;
	style?: string;
};

export type CoreHeadingProps = BaseProps< CoreHeadingAttributes >;

export type CoreHeading = ComponentType< CoreHeadingProps >;
