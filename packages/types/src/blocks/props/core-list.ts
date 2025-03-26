import type { ComponentType, PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreListAttributes = BaseAttributes & {
	cssClassName?: string;
	ordered?: boolean;
	reversed?: boolean;
	start?: number;
	style?: string;
	type?: string;
};

export type CoreListProps = PropsWithChildren<
	BaseProps< CoreListAttributes >
>;

export type CoreList = ComponentType< CoreListProps >;
