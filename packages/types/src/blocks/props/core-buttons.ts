import type { BaseAttributes, BaseProps } from '..';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreButtonsAttributes = BaseAttributes & {
	cssClassName?: string;
	style?: string;
};

export type CoreButtonsProps = PropsWithChildren<
	BaseProps< CoreButtonsAttributes >
>;

export type CoreButtons = ComponentType< CoreButtonsProps >;
