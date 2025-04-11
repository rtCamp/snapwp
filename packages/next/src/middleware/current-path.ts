import { NextResponse } from 'next/server';
import { addTrailingSlash } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import { QueryEngine } from '@snapwp/query';
import type { MiddlewareFactory } from './utils';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

/**
 * Middleware function for Next.js
 *
 * This middleware adds custom headers 'x-current-path' and 'x-snapwp-is404' to the response,
 * which contains the current pathname of the request, and the 404 status.
 *
 * @param {NextMiddleware} next Next middleware.
 *
 * @return The response object with modified headers
 */
export const currentPath: MiddlewareFactory = ( next: NextMiddleware ) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const pathname = request.nextUrl.pathname;

		const { uploadsDirectory, restUrlPrefix } = getConfig();

		const shouldSkip =
			pathname.startsWith( '/_next/' ) ||
			pathname.startsWith( '/api/' ) ||
			pathname.startsWith( addTrailingSlash( uploadsDirectory ) ) || // handled by `proxies` middleware
			pathname.startsWith( restUrlPrefix ) || // handled by `proxies` middleware
			pathname === '/wp-admin/admin-ajax.php' || // handled by `proxies` middleware
			pathname.match(
				/\.(js|css|png|jpg|jpeg|gif|svg|webp|mp4|webm|woff|woff2|ttf|eot|ico)$/
			);

		if ( shouldSkip ) {
			return next( request, _next );
		}

		let is404 = false;
		try {
			const { is404: fetchedIs404 } = await QueryEngine.getTemplateData(
				pathname || '/'
			);
			is404 = fetchedIs404;
		} catch ( error ) {}

		const response = await next( request, _next );

		if ( response ) {
			response.headers.set( 'x-current-path', pathname );

			if ( is404 ) {
				return new NextResponse( response.body, {
					status: 404,
					headers: response.headers,
				} );
			}
		}

		return response;
	};
};
