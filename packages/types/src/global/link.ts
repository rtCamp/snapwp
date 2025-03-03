import type { UrlObject } from 'url';
type Url = string | UrlObject;
type InternalLinkProps = {
	/**
	 * The path or URL to navigate to. It can also be an object.
	 *
	 * @example https://nextjs.org/docs/api-reference/next/link#with-url-object
	 */
	href: Url | undefined;
	/**
	 * Optional decorator for the path that will be shown in the browser URL bar. Before Next.js 9.5.3 this was used for dynamic routes, check our [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes) to see how it worked. Note: when this path differs from the one provided in `href` the previous `href`/`as` behavior is used as shown in the [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes).
	 */
	as?: Url | undefined;
	/**
	 * Replace the current `history` state instead of adding a new url into the stack.
	 *
	 */
	replace?: boolean | undefined;
	/**
	 * Whether to override the default scroll behavior
	 *
	 * @example https://nextjs.org/docs/api-reference/next/link#disable-scrolling-to-the-top-of-the-page
	 */
	scroll?: boolean | undefined;
	/**
	 * Update the path of the current page without rerunning [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props), [`getServerSideProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props) or [`getInitialProps`](/docs/pages/api-reference/functions/get-initial-props).
	 *
	 */
	shallow?: boolean | undefined;
	/**
	 * Forces `Link` to send the `href` property to its child.
	 *
	 */
	passHref?: boolean | undefined;
	/**
	 * Prefetch the page in the background.
	 * Any `<Link />` that is in the viewport (initially or through scroll) will be prefetched.
	 * Prefetch can be disabled by passing `prefetch={false}`. Prefetching is only enabled in production.
	 *
	 * In App Router:
	 * - `null` (default): For statically generated pages, this will prefetch the full React Server Component data. For dynamic pages, this will prefetch up to the nearest route segment with a [`loading.js`](https://nextjs.org/docs/app/api-reference/file-conventions/loading) file. If there is no loading file, it will not fetch the full tree to avoid fetching too much data.
	 * - `true`: This will prefetch the full React Server Component data for all route segments, regardless of whether they contain a segment with `loading.js`.
	 * - `false`: This will not prefetch any data, even on hover.
	 *
	 * In Pages Router:
	 * - `true` (default): The full route & its data will be prefetched.
	 * - `false`: Prefetching will not happen when entering the viewport, but will still happen on hover.
	 */
	prefetch?: boolean | null | undefined;
	/**
	 * The active locale is automatically prepended. `locale` allows for providing a different locale.
	 * When `false` `href` has to include the locale as the default behavior is disabled.
	 * Note: This is only available in the Pages Router.
	 */
	locale?: string | false | undefined;
	/**
	 * Enable legacy link behavior.
	 * @see https://github.com/vercel/next.js/commit/489e65ed98544e69b0afd7e0cfc3f9f6c2b803b7
	 */
	legacyBehavior?: boolean | undefined;
	/**
	 * Optional event handler for when the mouse pointer is moved onto Link
	 */
	onMouseEnter?: React.MouseEventHandler< HTMLAnchorElement > | undefined;
	/**
	 * Optional event handler for when Link is touched.
	 */
	onTouchStart?: React.TouchEventHandler< HTMLAnchorElement > | undefined;
	/**
	 * Optional event handler for when Link is clicked.
	 */
	onClick?: React.MouseEventHandler< HTMLAnchorElement > | undefined;
};
export type LinkProps = InternalLinkProps;
/**
 * A React component that extends the HTML `<a>` element to provide [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation between routes.
 *
 * It is the primary way to navigate between routes in Next.js.
 *
 * Read more: [Next.js docs: `<Link>`](https://nextjs.org/docs/app/api-reference/components/link)
 */
declare const Link: React.ForwardRefExoticComponent<
	Omit<
		React.AnchorHTMLAttributes< HTMLAnchorElement >,
		keyof InternalLinkProps
	> &
		InternalLinkProps & {
			children?: React.ReactNode | undefined;
		} & React.RefAttributes< HTMLAnchorElement >
>;
export default Link;
