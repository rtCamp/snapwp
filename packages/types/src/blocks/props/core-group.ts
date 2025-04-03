import type { ComponentType, PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreGroupAttributes = BaseAttributes & {
	style?: string;
	tagName?: string;
};

export type CoreGroupProps = PropsWithChildren<
	BaseProps< CoreGroupAttributes >
>;

export type CoreGroup = ComponentType< CoreGroupProps >;
