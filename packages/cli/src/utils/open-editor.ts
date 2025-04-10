import { spawn } from 'child_process';
import path from 'path';

/**
 * Opens a file in the default or specified editor and waits for the editor process to exit.
 *
 * @param {string} filePath - The path to the file to be opened in the editor.
 * @return {Promise<Object>} - A promise that resolves to an object containing:
 *                              - success: {boolean} Indicates if the operation was successful.
 *                              - message: {string} Provides additional information or error details.
 */
export function openEditor(
	filePath: string
): Promise< { success: boolean; message: string } > {
	return new Promise( ( resolve ) => {
		try {
			const editor =
				// eslint-disable-next-line n/no-process-env -- Use process.env to get the editor before falling back to 'vi'.
				process.env[ 'VISUAL' ] || process.env.EDITOR || 'vi';

			const child = spawn( editor, [ filePath ], {
				stdio: 'inherit',
			} );

			child.on( 'exit', function () {
				resolve( {
					success: true,
					message: `\nFile created at "${ path.resolve(
						filePath
					) }"`,
				} );
			} );
		} catch ( error ) {
			resolve( {
				success: false,
				message:
					error instanceof Error
						? `\nError: ${ error.message }`
						: '\nAn unknown error occurred.',
			} );
		}
	} );
}
