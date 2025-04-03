import type { ComponentType, PropsWithChildren } from 'react';

import type { BaseAttributes, BaseProps } from '..';

export type CoreButtonsAttributes = BaseAttributes & {
	cssClassName?: string;
	style?: string;
};

export type CoreButtonsProps = PropsWithChildren<
	BaseProps< CoreButtonsAttributes >
>;

export type CoreButtons = ComponentType< CoreButtonsProps >;
