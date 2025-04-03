import type { BaseAttributes, BaseProps } from '../base';
import type { ComponentType } from 'react';

export type CoreVerseAttributes = BaseAttributes & {
	content?: string;
	style?: string;
};

export type CoreVerseProps = BaseProps< CoreVerseAttributes >;

export type CoreVerse = ComponentType< CoreVerseProps >;
