# Middleware

- Next.js middleware is a function that runs before a request is processed, allowing you to modify the request/response, perform redirects, authentication, or other tasks globally or for specific routes.

## Default Middleware

Default middleware are added to all the requests that are made from the frontend project.

### Current Path

- This middleware adds a custom header 'x-current-path' to the response, which contains the current pathname of the request.

```typescript
/**
 * Middleware function for Next.js
 *
 * This middleware adds a custom header 'x-current-path' to the response,
 * which contains the current pathname of the request.
 *
 * @param  next - Next middleware
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
```

### Proxies

- This middleware configures custom proxies for the routes `wp-content/uploads/*`, `wp-json/*`, and `wp-admin/admin-ajax.php`, redirecting them to the WordPress domain.

```typescript
/**
 * Middleware function for Next.js
 *
 * This middleware adds custom proxies.
 *
 * @param  next - Next middleware
 * @return Custom redirection or NextMiddleware.
 */
export const proxies: MiddlewareFactory = ( next: NextMiddleware ) => {
	return async ( request: NextRequest, _next: NextFetchEvent ) => {
		const nextPath = request.nextUrl.pathname;

		const { homeUrl, uploadsDirectory, restUrlPrefix } = getConfig();

		// Proxy for WordPress uploads.
		const uploadsRegex = new RegExp(
			// Adding trailing slash to uploadsDirectory path if not already present before searching.
			`${ addTrailingSlash( uploadsDirectory ) }.*`
		);
		if ( uploadsRegex.test( nextPath ) ) {
			const match = uploadsRegex.exec( nextPath );

			if ( match && match[ 0 ] ) {
				return NextResponse.redirect( new URL( match[ 0 ], homeUrl ) );
			}
		}

		// Proxy for WordPress APIs.
		// If nextPath starts with restUrlPrefix, redirect to homeUrl/pathName.
		if ( nextPath.startsWith( restUrlPrefix ) ) {
			const APIRegex = new RegExp( `${ restUrlPrefix }.*` );
			const match = APIRegex.exec( request.nextUrl.toString() );
			if ( match && match[ 0 ] ) {
				return NextResponse.redirect( new URL( match[ 0 ], homeUrl ) );
			}
		}

		// Proxy for Admin AJAX.
		if ( '/wp-admin/admin-ajax.php' === nextPath ) {
			return NextResponse.redirect(
				new URL( '/wp-admin/admin-ajax.php', homeUrl )
			);
		}

		return next( request, _next );
	};
};
```

## How to add custom middleware

To add custom middleware, please follow the instructions provided below:

1. Create middleware of type `MiddlewareFactory`.
2. Import middleware to `src/middleware.ts` file.
3. In `src/middleware.ts` file, add imported middleware to `middleware` array.

## Misc Information about Middleware

### Type of Middleware

-   Middleware should always be of the type `MiddlewareFactory`.

```typescript
type MiddlewareFactory = ( middleware: NextMiddleware ) => NextMiddleware;
```

### Base Scaffold for Middleware Development

```typescript
import { MiddlewareFactory } from '@snapwp/next';
import { type NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';

export const MiddlewareName: MiddlewareFactory = (
	next: NextMiddleware
): NextMiddleware => {
	return ( request: NextRequest, _next: NextFetchEvent ) => {
		return next( request, _next );
	};
};
```

## Sample Implementation of Middleware

In this example we will be creating a homepage redirect whenever `/about` page is visited.

### Step 1

-   Create a `src/redirectToHome.ts` middleware file containing the following middleware code:

```typescript
import { MiddlewareFactory } from '@snapwp/next';
import { type NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';

export const redirectToHome: MiddlewareFactory = (
	next: NextMiddleware
): NextMiddleware => {
	// Return NextMiddleware.
	return ( request: NextRequest, _next: NextFetchEvent ) => {
		// Redirect to home page whenever user visits about page.
		if ( '/about' === request.nextUrl.pathname ) {
			return NextResponse.redirect( new URL( '/', request.url ) );
		}

		return next( request, _next ); // Call next middleware to conitnue execution.
	};
};
```

### Step 2

-   Import middleware created in `Step 1` file to `src/middleware.ts`.

```typescript
import { redirectToHome } from './redirectToHome';
```

### Step 3

-   In `src/middleware.ts`, add the imported `redirectToHome` middleware in `middlewares` array.

```typescript
const middlewares: MiddlewareFactory[] = [ redirectToHome ];
```

## Notes

-   Multiple middleware can be loaded by adding them to `middleware` array in `src/middleware.ts` file.
-   The execution priority of middleware will depend on the index they are added in `middleware` array.
