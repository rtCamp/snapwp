import {
	createElement,
	type CSSProperties,
	type PropsWithChildren,
	type ReactNode,
} from 'react';
import {
	cn,
	getClassNamesFromString,
	getStylesFromAttributes,
} from '@snapwp/core';
import type { CoreGroup as CoreGroupType, CoreGroupProps } from '@snapwp/types';

/**
 * Renders an HTML element with the specified tag name.
 *
 * @param {Object}             props           The props for the block component.
 * @param {TagProps.name}      props.name      The tag name of the HTML element.
 * @param {TagProps.className} props.className Class names.
 * @param {TagProps.style}     props.style     Inline styles.
 * @param {ReactNode}          props.children  The content to render inside the element.
 *
 * @return The rendered HTML element or the children if no tag name is provided.
 */
const Tag = ( {
	name,
	className,
	style,
	children,
}: PropsWithChildren< {
	name?: string;
	className: string;
	style?: CSSProperties;
} > ): ReactNode => {
	if ( ! name ) {
		return <>{ children }</>;
	}

	return createElement( name, { style, className }, children );
};

/**
 * Renders the core/group block.
 *
 * @param {Object}                      props              The props for the block component.
 * @param {CoreGroupProps.attributes}   props.attributes   Block attributes.
 * @param {ReactNode}                   props.children     The block's children.
 * @param {CoreGroupProps.renderedHtml} props.renderedHtml The block's rendered HTML.
 *
 * @return The rendered block.
 */
const CoreGroup: CoreGroupType = ( {
	attributes,
	renderedHtml,
	children,
}: CoreGroupProps ): ReactNode => {
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
		<Tag
			name={ tag }
			className={ classNames }
			{ ...( !! styleObject && { style: styleObject } ) }
		>
			{ children }
		</Tag>
	);
};

export default CoreGroup;
