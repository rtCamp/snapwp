import React from 'react';
import Parser from 'html-react-parser';
import { getConfig } from '@snapwp/core/config';
import { defaultOptions } from './options';
import type { HTMLReactParserOptions } from 'html-react-parser';
/**
 * Parses HTML string into React components.
 *
 * @param props - The props for the parser.
 * @param props.html - The HTML string to parse and render.
 *
 * @return {React.JSX.Element} The rendered React components.
 */
export default function Parse( { html }: { html: string } ): React.JSX.Element {
	const {
		parserOptions = defaultOptions,
	}: { parserOptions?: HTMLReactParserOptions } = getConfig();

	return <>{ Parser( html, parserOptions ) }</>;
}
