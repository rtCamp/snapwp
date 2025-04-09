/**
 * The different types of log messages.
 *
 * @internal
 */
export type LOGTYPE = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'LOG';

/**
 * Logs a message to the console.
 *
 * @param {LOGTYPE} type The type of log message.
 * @param {Array}  args The arguments to log.
 */
const log = ( type: LOGTYPE, ...args: unknown[] ): void => {
	if (
		// eslint-disable-next-line n/no-process-env -- Allow the use of process.env to check the current environment.
		'production' === process.env.NODE_ENV ||
		// eslint-disable-next-line n/no-process-env -- Allow the use of process.env to check the current environment.
		'test' === process.env.NODE_ENV
	) {
		return;
	}

	const prefix = 'SnapWP:';
	/* eslint-disable no-console -- Allow the use of console for loggers. */
	switch ( type ) {
		case 'DEBUG':
			console.debug( prefix, ...args );
			break;
		case 'INFO':
			console.info( prefix, ...args );
			break;
		case 'WARN':
			console.warn( prefix, ...args );
			break;
		case 'ERROR':
			console.error( prefix, ...args );
			break;
		case 'LOG':
			console.log( prefix, ...args );
			break;
	}
	/* eslint-enable no-console -- Disallow the use of console. */
};

/**
 * A simple logger that logs to the console in development mode.
 */
class Logger {
	/**
	 * Logs a debug message in the console in dev mode
	 *
	 * @param {Array} args The arguments to log.
	 *
	 * @example Logger.debug("This is a debug message.")
	 *
	 * @return void
	 */
	static debug = ( ...args: unknown[] ): void => log( 'DEBUG', ...args );

	/**
	 * Logs an info message in the console in dev mode
	 *
	 * @param {Array} args The arguments to log.
	 *
	 * @example Logger.info("This is an info message.")
	 *
	 * @return void
	 */
	static info = ( ...args: unknown[] ): void => log( 'INFO', ...args );

	/**
	 * Logs a warning in the console in dev mode
	 *
	 * @param {Array} args The arguments to log.
	 *
	 * @example Logger.warn("You should do/change something.")
	 *
	 * @return void
	 */
	static warn = ( ...args: unknown[] ): void => log( 'WARN', ...args );

	/**
	 * Logs an error in the console in dev mode
	 *
	 * @param {Array} args The arguments to log.
	 *
	 * @example Logger.error("An error occurred.")
	 *
	 * @return void
	 */
	static error = ( ...args: unknown[] ): void => log( 'ERROR', ...args );

	/**
	 * Logs a message in the console in dev mode
	 *
	 * @param {Array} args The arguments to log.
	 *
	 * @example Logger.log("This is a message.")
	 *
	 * @return void
	 */
	static log = ( ...args: unknown[] ): void => log( 'LOG', ...args );
}

export { Logger };
