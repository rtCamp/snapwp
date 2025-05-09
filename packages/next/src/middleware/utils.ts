import { NextResponse, type NextMiddleware } from 'next/server';
import { getConfig } from '@snapwp/core/config';
import { corsProxyMiddleware } from './cors';
import { proxies } from './proxies';

export type MiddlewareFactory = (
	middleware: NextMiddleware
) => NextMiddleware;

/**
 * Stacks middlewares.
 * Ref: https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs
 *
 * @param {Array<MiddlewareFactory>} functions               Array containing Middleware.
 * @param {number}                   index                   Index of current middleware.
 * @param {boolean}                  stackDefaultMiddlewares Weather to add load default middlewares with custom ones.
 *                                                           Pass false to skip loading default middlewares.
 *
 * @return NextJS Middleware.
 */
export function appMiddlewares(
	functions: MiddlewareFactory[] = [],
	index = 0,
	stackDefaultMiddlewares = true
): NextMiddleware {
	// To load the default middlewares, stackDefaultMiddlewares should be true for initial-load.
	if ( stackDefaultMiddlewares ) {
		functions = stackMiddlewares( functions );
	}

	const current = functions[ index ];

	if ( current ) {
		// Passing false to stackDefaultMiddlewares as default middlewares are already loaded.
		const next = appMiddlewares( functions, index + 1, false );
		return current( next );
	}

	return () => NextResponse.next();
}

/**
 * Stacks default middlewares with the custom middlewares passed by user.
 *
 * @param {Array<MiddlewareFactory>} middlewares Array containing user defined Middlewares.
 *
 * @return Array combining default middlewares and custom middlewares.
 */
export function stackMiddlewares(
	middlewares: MiddlewareFactory[] = []
): Array< MiddlewareFactory > {
	const { corsProxyPrefix } = getConfig();

	const defaultMiddlewares = [ proxies ];

	if ( corsProxyPrefix ) {
		defaultMiddlewares.push( corsProxyMiddleware );
	}

	return [ ...defaultMiddlewares, ...middlewares ];
}
