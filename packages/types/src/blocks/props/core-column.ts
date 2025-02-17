import type { PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '..';

export type CoreColumnAttributes = BaseAttributes & {
	style?: string;
	width?: string;
	cssClassName?: string;
};

export type CoreColumnProps = PropsWithChildren<
	BaseProps< CoreColumnAttributes >
>;

export type CoreColumn = React.ComponentType< CoreColumnProps >;
