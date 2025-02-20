import type { PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreQuoteAttributes = BaseAttributes & {
	citation?: string;
	cssClassName?: string;
	style?: string;
};

export type CoreQuoteProps = PropsWithChildren<
	BaseProps< CoreQuoteAttributes >
>;

export type CoreQuote = React.ComponentType< CoreQuoteProps >;
