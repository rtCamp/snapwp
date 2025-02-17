import { PropsWithChildren, CSSProperties, ReactNode } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreGroupAttributes = BaseAttributes & {
	style?: string;
	tagName?: string;
};

export type CoreGroupProps = PropsWithChildren<
	BaseProps< CoreGroupAttributes >
>;

export type CoreGroup = React.ComponentType< CoreGroupProps >;

export interface TagProps {
	name?: string;
	className: string;
	style: CSSProperties;
	children: ReactNode;
}
