import type { PropsWithChildren } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CoreTemplatePartAttributes = BaseAttributes & {
	templatePartTagName?: string | undefined;
	area?: string | undefined;
};

export type CoreTemplatePartProps = PropsWithChildren<
	BaseProps< CoreTemplatePartAttributes >
>;

export type CoreTemplatePart = React.ComponentType< CoreTemplatePartProps >;
