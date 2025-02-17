import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreColumnAttributes = BaseAttributes & {
	style?: string;
	width?: string;
	cssClassName?: string;
};

export type CoreColumnProps = PropsWithChildren<
	BaseProps< CoreColumnAttributes >
>;

export type CoreColumn = React.ComponentType< CoreColumnProps >;
