const readline = require( 'readline' );

/**
 * Prompts the user for input.
 *
 * @param {string} query Prompt query.
 * @param {string} defaultValue Default value for the prompt.
 *
 * @return {Promise<string>} User input.
 */
const prompt = ( query, defaultValue = '' ) => {
	const rl = readline.createInterface( {
		input: process.stdin,
		output: process.stdout,
	} );

	return new Promise( ( resolve ) => {
		rl.question(
			// Append default value to the query.
			query +
				( !! defaultValue ? ` [default: ${ defaultValue }]` : '' ) +
				'\n> ',
			( answer ) => {
				rl.close();

				// Replace escaped newlines with actual newlines.
				if ( answer.includes( '\\n' ) ) {
					answer = answer.split( '\\n' ).join( '\n' );
				}

				// Fallback to default value if no input provided.
				resolve( answer || defaultValue );
			}
		);
	} );
};

module.exports = {
	prompt,
};
