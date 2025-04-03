import type { JSX, ReactNode } from 'react';
import { cn, getClassNamesFromString } from '@snapwp/core';
import type {
	CoreTemplatePart as CoreTemplatePartType,
	CoreTemplatePartProps,
} from '@snapwp/types';

/**
 * Renders the core/template-part block.
 *
 * @param {Object}                             props              The props for the block component.
 * @param {CoreTemplatePartProps['attributes']}   props.attributes   Block attributes.
 * @param {ReactNode}                          props.children     The block's children.
 * @param {CoreTemplatePartProps['renderedHtml']} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreTemplatePart: CoreTemplatePartType = ( {
	renderedHtml,
	children,
	attributes,
}: CoreTemplatePartProps ): ReactNode => {
	const { templatePartTagName, area } = attributes || {};

	const htmlTag = templatePartTagName || area || 'div';

	const TagName = htmlTag as keyof JSX.IntrinsicElements;

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';
	const classNames = cn( classNamesFromString );
	return <TagName className={ classNames }>{ children }</TagName>;
};

export default CoreTemplatePart;
