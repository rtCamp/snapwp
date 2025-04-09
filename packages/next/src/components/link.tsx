import NextLink, { type LinkProps } from 'next/link';
import { isInternalUrl, toFrontendUri } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';

import type { PartialWithUndefined } from '@snapwp/types';
import type {
	AnchorHTMLAttributes,
	CSSProperties,
	PropsWithChildren,
	ReactNode,
} from 'react';

interface LinkInterface {
	href: string | undefined;
	style?: CSSProperties | undefined;
	className?: string | undefined;
}

/**
 * Link component to handle internal and external links.
 *
 * @param {Object}                     props           Props for the component.
 * @param {LinkInterface['href']}      props.href      Link's href attribute.
 * @param {LinkInterface['style']}     props.style     CSS style object.
 * @param {LinkInterface['className']} props.className CSS class name.
 * @param {ReactNode}                  props.children  Block's Children.
 *
 * @return The rendered link.
 */
export function Link( {
	href,
	style,
	className,
	children,
	...props
}: PropsWithChildren<
	LinkInterface &
		(
			| AnchorHTMLAttributes< HTMLAnchorElement >
			| PartialWithUndefined< LinkProps >
		)
> ): ReactNode {
	const { graphqlEndpoint } = getConfig();

	const internalUri = href
		? toFrontendUri( href )?.replace( `/${ graphqlEndpoint }`, '' ) // @todo: Remove replace when the graphql endpoint is removed from the pagination links.
		: '';

	if ( ! isInternalUrl( internalUri ) ) {
		return (
			<a
				{ ...props }
				className={ className }
				href={ internalUri || '' }
				style={ style }
			>
				{ children }
			</a>
		);
	}

	return (
		<NextLink
			// LinkProps conflicts with exactOptionalPropertyTypes: https://github.com/vercel/next.js/issues/50561
			{ ...( props as LinkProps ) }
			className={ className }
			href={ internalUri || '' }
			style={ style }
		>
			{ children }
		</NextLink>
	);
}
