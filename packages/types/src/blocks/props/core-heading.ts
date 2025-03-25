import type { ComponentType } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreHeadingAttributes = BaseAttributes & {
	content?: string;
	cssClassName?: string;
	level: number;
	style?: string;
};

export type CoreHeadingProps = BaseProps< CoreHeadingAttributes >;

export type CoreHeading = ComponentType< CoreHeadingProps >;
