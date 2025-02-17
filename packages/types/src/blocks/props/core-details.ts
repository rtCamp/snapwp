import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreDetailsAttributes = BaseAttributes & {
	style?: string;
	showContent: boolean;
	summary?: string;
};

export type CoreDetailsProps = PropsWithChildren<
	BaseProps< CoreDetailsAttributes >
>;

export type CoreDetails = React.ComponentType< CoreDetailsProps >;
