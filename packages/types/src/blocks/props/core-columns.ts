import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreColumnsAttributes = BaseAttributes & {
	style?: string;
	cssClassName?: string;
};

export type CoreColumnsProps = PropsWithChildren<
	BaseProps< CoreColumnsAttributes >
>;

export type CoreColumns = React.ComponentType< CoreColumnsProps >;
