import { createElement } from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import type {
	CoreGroup as CoreGroupType,
	CoreGroupProps,
	TagProps,
} from '@snapwp/types';

/**
 * Renders an HTML element with the specified tag name.
 *
 * @param props - The props for the block component.
 * @param props.name - The tag name of the HTML element.
 * @param props.className - Class names.
 * @param props.style - Inline styles.
 * @param props.children - The content to render inside the element.
 *
 * @return {React.JSX.Element} The rendered HTML element or the children if no tag name is provided.
 */
const Tag = ( {
	name,
	className,
	style,
	children,
}: TagProps ): React.JSX.Element => {
	if ( ! name ) {
		return <>{ children }</>;
	}

	return createElement( name, { style, className }, children );
};

/**
 * Renders the core/group block.
 *
 * @param props - The props for the block component.
 * @param props.attributes - Block attributes.
 * @param props.children - The block's children.
 * @param props.renderedHtml - The block's rendered HTML.
 *
 * @return {React.JSX.Element} The rendered block.
 */
const CoreGroup: CoreGroupType = ( {
	attributes,
	renderedHtml,
	children,
}: CoreGroupProps ) => {
	const { style, tagName } = attributes ?? {};

	const styleObject = getStylesFromAttributes( { style } );

	/**
	 * @todo replace with cssClassName once it's supported.
	 */
	const classNamesFromString = renderedHtml
		? getClassNamesFromString( renderedHtml )
		: '';

	const classNames = cn( classNamesFromString );
	const tag = tagName || 'div';

	return (
		<Tag name={ tag } className={ classNames } style={ styleObject }>
			{ children }
		</Tag>
	);
};

export default CoreGroup;
