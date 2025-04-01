import readline from 'readline';

/**
 * Prompts the user for input.
 *
 * @param {string} query Prompt query.
 * @param {string} defaultValue Default value for the prompt.
 *
 * @return {Promise<string>} User input.
 */
export default function prompt(
	query: string,
	defaultValue: string = ''
): Promise< string > {
	const rl = readline.createInterface( {
		input: process.stdin,
		output: process.stdout,
	} );

	return new Promise( ( resolve ) => {
		rl.question(
			// Append default value to the query.
			query + ( !! defaultValue ? ` (${ defaultValue })` : '' ),
			( answer: string ) => {
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
}
