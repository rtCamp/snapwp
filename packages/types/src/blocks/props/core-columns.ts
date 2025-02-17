import type { PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '..';

export type CoreColumnsAttributes = BaseAttributes & {
	style?: string;
	cssClassName?: string;
};

export type CoreColumnsProps = PropsWithChildren<
	BaseProps< CoreColumnsAttributes >
>;

export type CoreColumns = React.ComponentType< CoreColumnsProps >;
