import { BaseAttributes, BaseProps } from '../base';

export type CorePreformattedAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CorePreformattedProps = BaseProps< CorePreformattedAttributes >;

export type CorePreformatted = React.ComponentType< CorePreformattedProps >;
