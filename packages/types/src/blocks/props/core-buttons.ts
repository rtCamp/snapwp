import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreButtonsAttributes = BaseAttributes & {
	cssClassName?: string;
	style?: string;
};

export type CoreButtonsProps = PropsWithChildren<
	BaseProps< CoreButtonsAttributes >
>;

export type CoreButtons = React.ComponentType< CoreButtonsProps >;
