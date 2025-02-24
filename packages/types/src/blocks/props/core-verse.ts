import type { BaseAttributes, BaseProps } from '../base';

export type CoreVerseAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CoreVerseProps = BaseProps< CoreVerseAttributes >;

export type CoreVerse = React.ComponentType< CoreVerseProps >;
