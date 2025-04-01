import type { NextFetchEvent, NextRequest, NextMiddleware } from 'next/server';

import type { MiddlewareFactory } from './utils';

/**
 * Middleware function for Next.js
 *
 * This middleware adds a custom header 'x-current-path' to the response,
 * which contains the current pathname of the request.
 *
 * @param  next - Next middleware
 *
 * @return The response object with modified headers
 */
export const currentPath: MiddlewareFactory = ( next: NextMiddleware ) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const response = await next( request, _next );

		if ( response ) {
			response.headers.set( 'x-current-path', request.nextUrl.pathname );
		}

		return response;
	};
};
