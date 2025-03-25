import {
	NextResponse,
	type NextRequest,
	type NextMiddleware,
	type NextFetchEvent,
} from 'next/server';
import { getConfig } from '@snapwp/core/config';
import { addTrailingSlash } from '@snapwp/core';
import type { MiddlewareFactory } from './utils';

/**
 * Middleware function for Next.js
 *
 * This middleware adds custom proxies.
 *
 * @param  next - Next middleware
 *
 * @return Custom redirection or NextMiddleware.
 */
export const proxies: MiddlewareFactory = ( next: NextMiddleware ) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const nextPath = request.nextUrl.pathname;

		const { wpHomeUrl, uploadsDirectory, restUrlPrefix } = getConfig();

		// Proxy for WordPress uploads.
		const uploadsRegex = new RegExp(
			// Adding trailing slash to uploadsDirectory path if not already present before searching.
			`${ addTrailingSlash( uploadsDirectory ) }.*`
		);
		if ( uploadsRegex.test( nextPath ) ) {
			const match = uploadsRegex.exec( nextPath );

			if ( match && match[ 0 ] ) {
				return NextResponse.redirect(
					new URL( match[ 0 ], wpHomeUrl )
				);
			}
		}

		// Proxy for WordPress APIs.
		// If nextPath starts with restUrlPrefix, redirect to wpHomeUrl/pathName.
		if ( nextPath.startsWith( restUrlPrefix ) ) {
			const APIRegex = new RegExp( `${ restUrlPrefix }.*` );
			const match = APIRegex.exec( request.nextUrl.toString() );
			if ( match && match[ 0 ] ) {
				return NextResponse.redirect(
					new URL( match[ 0 ], wpHomeUrl )
				);
			}
		}

		// Proxy for Admin AJAX.
		if ( '/wp-admin/admin-ajax.php' === nextPath ) {
			return NextResponse.redirect(
				new URL( '/wp-admin/admin-ajax.php', wpHomeUrl )
			);
		}

		return next( request, _next );
	};
};
