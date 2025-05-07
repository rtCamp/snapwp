import type { MiddlewareFactory } from './utils';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

/**
 * Note: This middleware is not used in the current implementation.
 *
 * Middleware function for Next.js
 *
 * This middleware adds a custom header 'x-current-path' to the response,
 * which contains the current pathname of the request.
 *
 * @param {NextMiddleware} next Next middleware.
 *
 * @return The response object with modified headers
 */
// @ts-expect-error:TS6133 -- This middleware is not used in the current implementation.
const currentPath: MiddlewareFactory = ( next: NextMiddleware ) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const response = await next( request, _next );

		if ( response ) {
			response.headers.set( 'x-current-path', request.nextUrl.pathname );
		}

		return response;
	};
};
