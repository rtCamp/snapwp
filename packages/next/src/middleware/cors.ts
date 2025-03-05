import {
	NextResponse,
	type NextFetchEvent,
	type NextMiddleware,
	type NextRequest,
} from 'next/server';
import { getConfig } from '@snapwp/core/config';
import type { MiddlewareFactory } from './utils';
import { Logger } from '@snapwp/core';

/**
 * Facilitates proxying resources from WP resources. Any request with `hasCorsProxy`
 * as the first path element will be proxied to WP server.
 *
 * eg: http://localhost:3000/proxy/assets/api.js will get resouce at https://examplewp/assets/api.js
 * assuming env vars NEXT_PUBLIC_FRONTEND_URL had its value set to http://localhost:3000 and NEXT_PUBLIC_WP_HOME_URL to https://examplewp.com
 *
 * @param  next - Next middleware
 * @return The response object with modified headers
 */
export const corsProxyMiddleware: MiddlewareFactory = (
	next: NextMiddleware
) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const config = getConfig();
		const { homeUrl } = config;
		// We have already checked whether hasCorsProxy has value or not in /middleware/utils.ts
		const hasCorsProxy = config.hasCorsProxy as string;

		if ( ! request.nextUrl.pathname.startsWith( hasCorsProxy ) ) {
			return next( request, _next );
		}

		// Construct the target URL
		const targetUrl =
			homeUrl + request.nextUrl.pathname.replace( hasCorsProxy, '' );
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
					'Content-Security-Policy': "default-src 'self'",
				},
			} );
		} catch ( error ) {
			Logger.error( 'Proxy error:', error );
			return NextResponse.json(
				{ error: 'Internal Server Error' },
				{ status: 500 }
			);
		}
	};
};
