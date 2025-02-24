import type { BaseAttributes, BaseProps } from '..';

export type CoreButtonAttributes = BaseAttributes & {
	cssClassName?: string;
	linkClassName?: string;
	linkTarget?: string;
	rel?: string;
	style?: string;
	tagName?: string;
	text?: string;
	title?: string;
	url?: string;
	buttonType?: string;
};

export type CoreButtonProps = BaseProps< CoreButtonAttributes >;

export type CoreButton = React.ComponentType< CoreButtonProps >;
