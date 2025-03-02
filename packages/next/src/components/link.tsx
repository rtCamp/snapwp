import React, {
	type AnchorHTMLAttributes,
	type CSSProperties,
	type PropsWithChildren,
} from 'react';
import { toInternalUrl, isInternalUrl } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import NextLink, { type LinkProps } from 'next/link';

interface LinkInterface {
	href?: string;
	style?: CSSProperties | undefined;
	className?: string | undefined;
}

/**
 * Link component to handle internal and external links.
 *
 * @param props - Props for the component.
 * @param props.href - Link's href attribute.
 * @param props.style - CSS style object.
 * @param props.className - CSS class name.
 * @param props.children - Block's Children.
 *
 * @return The rendered link.
 */
export default function Link( {
	href,
	style,
	className,
	children,
	...props
}: PropsWithChildren<
	LinkInterface & ( LinkProps | AnchorHTMLAttributes< HTMLAnchorElement > )
> ) {
	const { graphqlEndpoint } = getConfig();

	const internalUri = href
		? toInternalUrl( href )?.replace( `/${ graphqlEndpoint }`, '' )
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
			{ ...props }
			className={ className }
			href={ internalUri || '' }
			style={ style }
		>
			{ children }
		</NextLink>
	);
}
