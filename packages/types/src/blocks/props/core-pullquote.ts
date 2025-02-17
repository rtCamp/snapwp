import type { BaseAttributes, BaseProps } from '../base';

export type CorePullquoteAttributes = BaseAttributes & {
	citation?: string;
	style?: string;
	textAlign?: string;
	pullquoteValue?: string;
};

export type CorePullquoteProps = BaseProps< CorePullquoteAttributes >;

export type CorePullquote = React.ComponentType< CorePullquoteProps >;
