# Middleware

Next.js [middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) allows you to run custom logic before Next.js processes the request.

The [`@snapwp/next`](../packages/next/README.md) package provides middleware to integrate your frontend project with a headless WordPress backend along with any custom middleware you may need.

## Usage

```ts
// ./src/app/middleware.ts
import { appMiddlewares, type MiddlewareFactory } from '@snapwp/next';

const middleware: MiddlewareFactory[] = [
	// Add your custom middleware here, e.g.:
	myCustomMiddleware,
];

// Combine them with default middleware.
export default appMiddlewares( middleware );
```

## Default middleware

Default middleware are added to all the requests that are made from the frontend project.

### [Current Path](../packages/next/src/middleware/current-path.ts)

Adds a custom header 'x-current-path' to the response, which is used to query the GraphQL data for that URI.

### [Proxies](packages/next/src/middleware/proxies.ts)

Configures custom proxies to the headless WordPress backend for the following routes:

-   `wp-content/uploads/*`
-   `wp-json/*`
-   `wp-admin/admin-ajax.php`

## Adding custom middleware

Middleware should be defined as type `MiddlewareFactory` and then added to the array passed to `appMiddlewares()`.

> [!NOTE]
> There is no limit to the number of middleware you can add.
>
> Middleware are executed in the order they are added to the array.

```ts
// my-custom-middleware.ts
import type { MiddlewareFactory } from '@snapwp/next';
import type { NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';

export const myCustomMiddleware: MiddlewareFactory = (
	next: NextMiddleware
): NextMiddleware => {
	return ( request: NextRequest, _next: NextFetchEvent ) => {
		// Custom middleware logic here.

		return next( request, _next ); // Calls the next middleware in the chain.
	};
};

// ./src/app/middleware.ts
import { appMiddlewares, type MiddlewareFactory } from '@snapwp/next';
import { myCustomMiddleware } from './my-custom-middleware';

const middleware: MiddlewareFactory[] = [
	myCustomMiddleware, // 👈 Add your middleware here here.
];

export default appMiddlewares( middleware );
```
