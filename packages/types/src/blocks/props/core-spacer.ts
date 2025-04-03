import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CoreSpacerAttributes = BaseAttributes & {
	height: string;
	style?: string;
	width?: string;
};

export type CoreSpacerProps = BaseProps< CoreSpacerAttributes >;

export type CoreSpacer = ComponentType< CoreSpacerProps >;
