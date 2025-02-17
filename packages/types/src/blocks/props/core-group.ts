import type { PropsWithChildren, CSSProperties, ReactNode } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

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
