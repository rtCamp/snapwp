import type { BaseAttributes, BaseProps } from '..';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreColumnAttributes = BaseAttributes & {
	style?: string;
	width?: string;
	cssClassName?: string;
};

export type CoreColumnProps = PropsWithChildren<
	BaseProps< CoreColumnAttributes >
>;

export type CoreColumn = ComponentType< CoreColumnProps >;
