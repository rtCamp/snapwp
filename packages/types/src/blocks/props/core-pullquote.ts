import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CorePullquoteAttributes = BaseAttributes & {
	citation?: string;
	style?: string;
	textAlign?: string;
	pullquoteValue?: string;
};

export type CorePullquoteProps = BaseProps< CorePullquoteAttributes >;

export type CorePullquote = ComponentType< CorePullquoteProps >;
