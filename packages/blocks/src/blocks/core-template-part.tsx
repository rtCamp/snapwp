import React, { type JSX } from 'react';
import { cn, getClassNamesFromString } from '@snapwp/core';
import type {
	CoreTemplatePart as CoreTemplatePartType,
	CoreTemplatePartProps,
} from '@snapwp/types';

/**
 * Renders the core/template-part block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreTemplatePart: CoreTemplatePartType = ( {
	renderedHtml,
	children,
	attributes,
}: CoreTemplatePartProps ) => {
	const { templatePartTagName } = attributes || {};
	/**
	 * @todo add support for area_tag.
	 * @see https://github.com/WordPress/gutenberg/blob/4775e7052b9e2ed7df46429e6e738de3faf2fb18/packages/block-library/src/template-part/index.php#L165
	 */
	const TagName = ( templatePartTagName ||
		'div' ) as keyof JSX.IntrinsicElements;

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
