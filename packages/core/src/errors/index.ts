/**
 * Error thrown when parsing the template data.
 */
class TemplateParseError extends Error {
	/**
	 * Constructor.
	 *
	 * @param message The error message.
	 */
	constructor( message: string ) {
		super( message );
		this.name = 'TemplateParseError';
	}
}

/**
 * Error thrown when parsing global styles fails.
 */
class GlobalStylesParseError extends Error {
	/**
	 * Constructor.
	 *
	 * @param message - The error message.
	 */
	constructor( message: string ) {
		super( message );
		this.name = 'GlobalStylesParseError';
	}
}

export { TemplateParseError, GlobalStylesParseError };
