# Middleware

-   Next.js middleware is a function that runs before a request is processed, allowing you to modify the request/response, perform redirects, authentication, or other tasks globally or for specific routes.

## Default Middleware

Default middleware are added to all the requests that are made from the frontend project.

### Current Path

-   This middleware adds a custom header 'x-current-path' to the response, which contains the current pathname of the request.

### Proxies

-   This middleware configures custom proxies for the routes `wp-content/uploads/*`, `wp-json/*`, and `wp-admin/admin-ajax.php`, redirecting them to the WordPress domain.

## How to add custom middleware

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

## Notes

-   Multiple middleware can be loaded by adding them to `middleware` array in `src/middleware.ts` file.
-   The execution priority of middleware will depend on the index they are added in `middleware` array.
