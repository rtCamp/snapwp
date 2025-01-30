import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { getConfig } from '@snapwp/core/config';
import { MiddlewareFactory } from './utils';

/**
 *
 * @param next
 */
export const cors: MiddlewareFactory = ( next: NextMiddleware ) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const { homeUrl, corsProxyPrefix } = getConfig();

		if ( ! request.nextUrl.pathname.startsWith( corsProxyPrefix ) ) {
			return next( request, _next );
		}

		// Construct the target URL
		const targetUrl =
			homeUrl + request.nextUrl.pathname.replace( corsProxyPrefix, '' );
		try {
			// Forward the request to the external API
			const response = await fetch( targetUrl, {
				headers: {
					'Content-Type': 'application/javascript', // Ensure the correct MIME type
				},
			} );

			// Check if the response is OK
			if ( ! response.ok ) {
				throw new Error(
					`Error from external API: ${ response.statusText }`
				);
			}

			// Get the response data
			const data = await response.text();

			// Return the response with the correct Content-Type header
			return new NextResponse( data, {
				headers: {
					'Content-Type': 'application/javascript',
				},
			} );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Proxy error:', error );
			return NextResponse.json(
				{ error: 'Internal Server Error' },
				{ status: 500 }
			);
		}
	};
};
