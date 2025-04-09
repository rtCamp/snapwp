import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreQuoteAttributes = BaseAttributes & {
	citation?: string;
	cssClassName?: string;
	style?: string;
};

export type CoreQuoteProps = PropsWithChildren<
	BaseProps< CoreQuoteAttributes >
>;

export type CoreQuote = ComponentType< CoreQuoteProps >;
