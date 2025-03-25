import type { ComponentType } from 'react';
import type { BaseAttributes, BaseProps } from '../base';

export type CorePreformattedAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CorePreformattedProps = BaseProps< CorePreformattedAttributes >;

export type CorePreformatted = ComponentType< CorePreformattedProps >;
