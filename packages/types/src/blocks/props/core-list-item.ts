import type { ComponentType, PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreListItemAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CoreListItemProps = PropsWithChildren<
	BaseProps< CoreListItemAttributes >
>;

export type CoreListItem = ComponentType< CoreListItemProps >;
