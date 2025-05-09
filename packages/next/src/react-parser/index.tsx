import Parser from 'html-react-parser';
import { getConfig } from '@snapwp/core/config';
import { defaultOptions } from './options';

import type { HTMLReactParserOptions } from 'html-react-parser';
import type { ReactNode } from 'react';

/**
 * Parses HTML string into React components.
 *
 * @param {Object} props      The props for the parser.
 * @param {string} props.html The HTML string to parse and render.
 *
 * @return The rendered React components.
 */
export function Parse( { html }: { html: string } ): ReactNode {
	const {
		parserOptions = defaultOptions,
	}: { parserOptions?: HTMLReactParserOptions } = getConfig();

	return <>{ Parser( html, parserOptions ) }</>;
}
