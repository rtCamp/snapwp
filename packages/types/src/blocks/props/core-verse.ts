import { BlockProps } from '../base';

export interface CoreVerseAttributes extends Record< string, unknown > {
	content?: string;
	style?: string;
}

export interface CoreVerseProps extends BlockProps {
	attributes?: CoreVerseAttributes;
}
