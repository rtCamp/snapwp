import { appMiddlewares, type MiddlewareFactory, cors } from '@snapwp/next';

/**
 * Layer your own custom middlewares here by adding them to the array.
 * NOTE: Cors is a developer middleware to bypass CORS errors encountered when running on localhost.
 *
 * @see https://github.com/rtCamp/snapwp/blob/main/docs/middleware.md
 */
const middleware: MiddlewareFactory[] = [cors];

export default appMiddlewares( middleware );
