import { appMiddlewares, type MiddlewareFactory } from '@snapwp/next';

/**
 * Layer your own custom middlewares here by adding them to the array.
 *
 * @see https://github.com/rtCamp/snapwp/blob/main/docs/middleware.md
 */
const middleware: MiddlewareFactory[] = [];

export default appMiddlewares( middleware );
