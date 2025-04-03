import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

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
