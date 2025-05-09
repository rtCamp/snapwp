import type { BaseAttributes, BaseProps } from '..';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreColumnsAttributes = BaseAttributes & {
	style?: string;
	cssClassName?: string;
};

export type CoreColumnsProps = PropsWithChildren<
	BaseProps< CoreColumnsAttributes >
>;

export type CoreColumns = ComponentType< CoreColumnsProps >;
