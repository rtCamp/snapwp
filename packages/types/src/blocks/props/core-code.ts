import { BaseAttributes, BaseProps } from '../base';

export type CoreCodeAttributes = BaseAttributes & {
	style?: string;
	content?: string;
	cssClassName?: string;
};

export type CoreCodeProps = BaseProps< CoreCodeAttributes >;

export type CoreCode = React.ComponentType< CoreCodeProps >;
