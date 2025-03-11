import { NextResponse, type NextMiddleware } from 'next/server';
import { proxies } from './proxies';
import { currentPath as cm } from './current-path';
import { corsProxyMiddleware } from './cors';
import { getConfig } from '@snapwp/core/config';

export type MiddlewareFactory = (
	middleware: NextMiddleware
) => NextMiddleware;

/**
 * Stacks middlewares.
 * Ref: https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs
 *
 * @param functions               Array containing Middleware.
 * @param index                   Index of current middleware.
 * @param stackDefaultMiddlewares Weather to add load default middlewares with custom ones.
 *                                Pass false to skip loading default middlewares.
 *
 * @return {NextMiddleware} NextJS Middleware.
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
 * @param middlewares Array containing user defined Middlewares.
 *
 * @return {Array<MiddlewareFactory>} Array combining default middlewares and custom middlewares.
 */
export function stackMiddlewares(
	middlewares: MiddlewareFactory[] = []
): Array< MiddlewareFactory > {
	const { useCorsProxy } = getConfig();

	const defaultMiddlewares = [ cm, proxies ];

	if ( useCorsProxy ) {
		defaultMiddlewares.push( corsProxyMiddleware );
	}

	return [ ...defaultMiddlewares, ...middlewares ];
}
