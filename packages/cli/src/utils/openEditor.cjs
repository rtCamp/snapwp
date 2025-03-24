const path = require( 'path' );
const { spawn } = require( 'child_process' );

/**
 * Opens a file in the default or specified editor and waits for the editor process to exit.
 *
 * @param {string} filePath - The path to the file to be opened in the editor.
 * @return {Promise<Object>} - A promise that resolves to an object containing:
 *                              - success: {boolean} Indicates if the operation was successful.
 *                              - message: {string} Provides additional information or error details.
 */
const openEditor = ( filePath ) => {
	return new Promise( ( resolve ) => {
		try {
			// eslint-disable-next-line n/no-process-env -- Use process.env to get the editor before falling back to 'vi'.
			const editor = process.env.VISUAL || process.env.EDITOR || 'vi';

			const child = spawn( editor, [ filePath ], {
				stdio: 'inherit',
			} );

			child.on( 'exit', function () {
				resolve( {
					success: true,
					message: `File created at "${ path.resolve( filePath ) }"`,
				} );
			} );
		} catch ( error ) {
			resolve( {
				success: false,
				message: `Error: ${ error.message }`,
			} );
		}
	} );
};

module.exports = { openEditor };
