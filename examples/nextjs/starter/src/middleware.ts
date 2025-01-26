import { appMiddlewares, MiddlewareFactory } from '@snapwp/next';

/**
 * Layer your own custom middlewares here by adding them to the array.
 *
 * @see @todo add docs link
 */
const middlewares: MiddlewareFactory[] = [];

export default appMiddlewares( middlewares );
