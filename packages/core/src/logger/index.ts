/**
 * The different types of log messages.
 *
 * @internal
 */
export enum LOGTYPE {
	DEBUG,
	INFO,
	WARN,
	ERROR,
	LOG,
}

/**
 * Logs a message to the console.
 *
 * @param type - The type of log message.
 * @param args - The arguments to log.
 */
const log = ( type: LOGTYPE, ...args: any[] ): void => {
	if (
		// eslint-disable-next-line n/no-process-env
		'production' === process.env.NODE_ENV ||
		// eslint-disable-next-line n/no-process-env
		'test' === process.env[ 'NODE_ENV' ]
	) {
		return;
	}

	const prefix = 'SnapWP:';
	/* eslint-disable no-console */
	switch ( type ) {
		case LOGTYPE.DEBUG:
			console.debug( prefix, ...args );
			break;
		case LOGTYPE.INFO:
			console.info( prefix, ...args );
			break;
		case LOGTYPE.WARN:
			console.warn( prefix, ...args );
			break;
		case LOGTYPE.ERROR:
			console.error( prefix, ...args );
			break;
		case LOGTYPE.LOG:
			console.log( prefix, ...args );
			break;
	}
	/* eslint-enable no-console */
};

/**
 * A simple logger that logs to the console in development mode.
 */
class Logger {
	/**
	 * Logs a debug message in the console in dev mode
	 *
	 * @param args - The arguments to log.
	 *
	 * @example Logger.debug("This is a debug message.")
	 *
	 * @return void
	 */
	static debug = ( ...args: any[] ): void => log( LOGTYPE.DEBUG, ...args );

	/**
	 * Logs an info message in the console in dev mode
	 *
	 * @param args - The arguments to log.
	 *
	 * @example Logger.info("This is an info message.")
	 *
	 * @return void
	 */
	static info = ( ...args: any[] ): void => log( LOGTYPE.INFO, ...args );

	/**
	 * Logs a warning in the console in dev mode
	 *
	 * @param args - The arguments to log.
	 *
	 * @example Logger.warn("You should do/change something.")
	 *
	 * @return void
	 */
	static warn = ( ...args: any[] ): void => log( LOGTYPE.WARN, ...args );

	/**
	 * Logs an error in the console in dev mode
	 *
	 * @param args - The arguments to log.
	 *
	 * @example Logger.error("An error occurred.")
	 *
	 * @return void
	 */
	static error = ( ...args: any[] ): void => log( LOGTYPE.ERROR, ...args );

	/**
	 * Logs a message in the console in dev mode
	 *
	 * @param args - The arguments to log.
	 *
	 * @example Logger.log("This is a message.")
	 *
	 * @return void
	 */
	static log = ( ...args: any[] ): void => log( LOGTYPE.LOG, ...args );
}

export { Logger };
