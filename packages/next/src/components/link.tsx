import {
	type AnchorHTMLAttributes,
	type CSSProperties,
	type PropsWithChildren,
	type ReactNode,
} from 'react';
import { toFrontendUri, isInternalUrl } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import type { PartialWithUndefined } from '@snapwp/types';
import NextLink, { type LinkProps } from 'next/link';

interface LinkInterface {
	href: string | undefined;
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
