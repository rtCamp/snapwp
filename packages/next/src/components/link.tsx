import React, {
	type CSSProperties,
	type HTMLAttributes,
	type PropsWithChildren,
} from 'react';
import { replaceHostUrl } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import NextLink, { type LinkProps } from 'next/link';

interface LinkInterface {
	href?: string;
	style?: CSSProperties | undefined;
	className?: string | undefined;
}
interface NavLinkProps extends LinkProps, HTMLAttributes< HTMLAnchorElement > {}

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
}: PropsWithChildren< LinkInterface & NavLinkProps > ) {
	const { homeUrl, nextUrl, graphqlEndpoint } = getConfig();

	const internalUri = href
		? replaceHostUrl(
				href,
				homeUrl,
				nextUrl
				// @todo: Remove replace when the graphql endpoint is removed from the pagination links.
		  )?.replace( `/${ graphqlEndpoint }`, '' )
		: '';

	// @todo replace internalUri?.startsWith conditional check with something more robust that will incorporate both frontend/backend domain & anything in the list of allowed images domain in the config (ref: https://github.com/rtCamp/headless/pull/241#discussion_r1824274200). TBD after https://github.com/rtCamp/headless/issues/218.
	if (
		! internalUri?.startsWith( '/' ) &&
		! internalUri?.startsWith( nextUrl )
	) {
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
