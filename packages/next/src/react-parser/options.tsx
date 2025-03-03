import React from 'react';
import {
	domToReact,
	Element,
	type DOMNode,
	type HTMLReactParserOptions,
} from 'html-react-parser';
import {
	getStyleObjectFromString,
	getImageSizeFromAttributes,
} from '@snapwp/core';
import Image from '@/components/image';
import Link from '@/components/link';

export const defaultOptions: HTMLReactParserOptions = {
	/**
	 * Replaces anchor tags with Next.js Link components.
	 *
	 * @param domNode - The DOM node being processed.
	 *
	 * @return {React.JSX.Element|undefined} A React element if the node is an anchor tag, otherwise undefined.
	 */
	replace: ( domNode ) => {
		if ( domNode instanceof Element ) {
			const { attribs, children, name, type } = domNode;
			const { class: className, style, ...attributes } = attribs;
			const { href } = attribs;
			const styleObject = style
				? getStyleObjectFromString( style )
				: undefined;

			if ( type === 'tag' && name === 'a' ) {
				return (
					<Link
						{ ...attributes }
						href={ href }
						style={ styleObject }
						className={ className }
					>
						{ domToReact( children as DOMNode[], defaultOptions ) }
					</Link>
				);
			} else if ( type === 'tag' && name === 'img' ) {
				const { width, height } = getImageSizeFromAttributes( attribs );

				const imageAttributes = {
					id: attribs[ 'id' ],
					mediaDetails: {
						width,
						height,
					},
				};

				const shouldFill =
					! width &&
					! height &&
					undefined !== width &&
					undefined !== height;

				// srcset should be srcSet
				if ( attributes[ 'srcset' ] ) {
					attributes[ 'srcSet' ] = attributes[ 'srcset' ];
					delete attributes[ 'srcset' ];
				}

				if ( attributes[ 'fetchpriority' ] ) {
					attributes[ 'fetchPriority' ] =
						attributes[ 'fetchpriority' ];
					delete attributes[ 'fetchpriority' ];
				}

				return (
					<Image
						{ ...attributes }
						src={ attribs[ 'src' ] }
						alt={ attribs[ 'alt' ] || '' }
						height={ height }
						width={ width }
						className={ className }
						fill={ shouldFill }
						style={ styleObject }
						image={ imageAttributes }
					/>
				);
			}

			return undefined;
		}

		return undefined;
	},
};
