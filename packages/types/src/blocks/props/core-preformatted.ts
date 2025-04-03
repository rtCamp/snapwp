import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CorePreformattedAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CorePreformattedProps = BaseProps< CorePreformattedAttributes >;

export type CorePreformatted = ComponentType< CorePreformattedProps >;
