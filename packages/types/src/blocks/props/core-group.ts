import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreGroupAttributes = BaseAttributes & {
	style?: string;
	tagName?: string;
};

export type CoreGroupProps = PropsWithChildren<
	BaseProps< CoreGroupAttributes >
>;

export type CoreGroup = ComponentType< CoreGroupProps >;
