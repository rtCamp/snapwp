import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreListItemAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CoreListItemProps = PropsWithChildren<
	BaseProps< CoreListItemAttributes >
>;

export type CoreListItem = React.ComponentType< CoreListItemProps >;
