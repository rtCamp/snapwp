import { appMiddlewares, type MiddlewareFactory, corsMiddleware } from '@snapwp/next';

/**
 * Layer your own custom middlewares here by adding them to the array.
 *
 * @see https://github.com/rtCamp/snapwp/blob/main/docs/middleware.md
 */
const middleware: MiddlewareFactory[] = [
    // Proxies WordPress assets (scripts, theme files, etc) to prevent CORS issues on localhost.
    corsMiddleware
];

export default appMiddlewares( middleware );
