import type { ComponentType, PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreDetailsAttributes = BaseAttributes & {
	style?: string;
	showContent: boolean;
	summary?: string;
};

export type CoreDetailsProps = PropsWithChildren<
	BaseProps< CoreDetailsAttributes >
>;

export type CoreDetails = ComponentType< CoreDetailsProps >;
