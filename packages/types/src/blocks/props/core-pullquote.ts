import { BlockProps } from '../base';

export interface CorePullquoteAttributes extends Record< string, unknown > {
	citation?: string;
	style?: string;
	textAlign?: string;
	pullquoteValue?: string;
}

export interface CorePullquoteProps extends BlockProps {
	attributes?: CorePullquoteAttributes;
}
