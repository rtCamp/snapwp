import type { ComponentType } from 'react';
import type { BaseAttributes, BaseProps } from '..';

export type CoreCodeAttributes = BaseAttributes & {
	style?: string;
	content?: string;
	cssClassName?: string;
};

export type CoreCodeProps = BaseProps< CoreCodeAttributes >;

export type CoreCode = ComponentType< CoreCodeProps >;
