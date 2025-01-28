# Middlewares

## How to add custom middlewares
To add custom middleware, please follow the instructions provided below:
1. Create middleware of type `MiddlewareFactory`.
2. Import middleware to `src/middleware.ts` file.
3. In `src/middleware.ts` file, add imported middleware to `middlewares` array.

## Misc Information about Middlewares

### Type of Middleware
- Middleware should always be of the type `MiddlewareFactory`.

```typescript
type MiddlewareFactory = ( middleware: NextMiddleware ) => NextMiddleware;
```

### Base Scaffold for Middleware Development

```typescript
import { MiddlewareFactory } from '@snapwp/next';
import { type NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';

export const MiddlewareName: MiddlewareFactory = ( next: NextMiddleware ): NextMiddleware => {
	return ( request: NextRequest, _next: NextFetchEvent ) => {
		return next( request, _next );
	};
}
```

## Sample Implementation of Middleware
In this example we will be creating a homepage redirect whenever `/about` page is visited.

### Step 1
- Create a `src/redirectToHome.ts` middleware file containing the following middleware code:

```typescript
import { MiddlewareFactory } from '@snapwp/next';
import { type NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';

export const redirectToHome: MiddlewareFactory = ( next: NextMiddleware ): NextMiddleware => {

	return ( request: NextRequest, _next: NextFetchEvent ) => { // Return NextMiddleware.

		if ( '/about' === request.nextUrl.pathname ) { // Redirect to home page whenever user visits about page.
			return NextResponse.redirect( new URL( '/', request.url ) );
		}

		return next( request, _next ); // Call next middleware to conitnue execution.

	};
}
```

### Step 2
- Import middleware created in `Step 1` file to `src/middleware.ts`.

```typescript
import { redirectToHome } from './redirectToHome';
```

### Step 3
- In `src/middleware.ts`, add the imported `redirectToHome` middleware in `middlewares` array.

```typescript
const middlewares: MiddlewareFactory[] = [ redirectToHome ];
```

## Notes
- Multiple middlewares can be loaded by adding them to `middlewares` array in `src/middleware.ts` file.
- The execution priority of middleware will depend on the index they are added in `middlewares` array.  