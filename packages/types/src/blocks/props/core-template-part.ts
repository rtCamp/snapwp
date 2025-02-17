import { PropsWithChildren } from 'react';
import { BaseAttributes, BaseProps } from '../base';

export type CoreTemplatePartAttributes = BaseAttributes & {
	templatePartTagName?: string;
};

export type CoreTemplatePartProps = PropsWithChildren<
	BaseProps< CoreTemplatePartAttributes >
>;

export type CoreTemplatePart = React.ComponentType< CoreTemplatePartProps >;
