import type { PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreListItemAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CoreListItemProps = PropsWithChildren<
	BaseProps< CoreListItemAttributes >
>;

export type CoreListItem = React.ComponentType< CoreListItemProps >;
