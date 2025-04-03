import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType, PropsWithChildren } from 'react';

export type CoreTemplatePartAttributes = BaseAttributes & {
	templatePartTagName?: string | undefined;
	area?: string | undefined;
};

export type CoreTemplatePartProps = PropsWithChildren<
	BaseProps< CoreTemplatePartAttributes >
>;

export type CoreTemplatePart = ComponentType< CoreTemplatePartProps >;
