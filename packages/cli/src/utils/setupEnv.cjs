const path = require( 'path' );
const fs = require( 'fs/promises' );
const { spawn } = require( 'child_process' );

const { prompt } = require( './prompt.cjs' );
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
			const editor = process.env.EDITOR || 'vi';

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

/**
 * Handles the creation and validation of the .env file.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useDefaultPath - Whether using default path or not.
 * @return {Promise<void>}
 */
const setupEnvFile = async ( projectDirPath, useDefaultPath ) => {
	const envPath = path.join( projectDirPath, '.env' );

	try {
		await fs.access( envPath );
	} catch ( error ) {
		if ( 'ENOENT' !== error.code ) {
			throw error;
		}

		// If using default path, copy .env.example to .env
		if ( useDefaultPath ) {
			const srcPath = path.resolve(
				__dirname,
				'../../../../../.env.example'
			);
			console.log( 'srcPath::::::', srcPath );
			const destPath = path.resolve( envPath );
			await fs.cp( srcPath, destPath );
			return;
		}

		await prompt(
			`\nNo .env file found in "${ projectDirPath }". Please \n` +
				'  1. Press any key to open a new .env file in your default editor,\n' +
				'  2. Paste in the environment variables from your WordPress site, and update the values as needed. \n' +
				'  3. Save and close the file to continue the installation. \n' +
				'\n (For more information on configuring your .env file, see the SnapWP documentation.)'
		);

		// Create empty file first to prevent editor extension issues
		await fs.writeFile( envPath, '' );
		const envFileCreationStatus = await openEditor( envPath );

		if ( ! envFileCreationStatus.success ) {
			throw new Error( envFileCreationStatus.message );
		}
		console.log( envFileCreationStatus.message );

		// Verify .env file exists
		try {
			await fs.access( envPath );
		} catch ( err ) {
			if ( 'ENOENT' === err.code ) {
				throw new Error(
					`".env" still not found at "${ envPath }". Please create an ".env" and try again.`
				);
			}

			throw err;
		}
	}

	// Verify .env file is not empty
	const { size } = await fs.stat( envPath );

	if ( 0 === size ) {
		await fs.rm( envPath, { force: true } ); // Delete empty file

		throw new Error(
			`An empty ".env" found at "${ envPath }". Please try again with a non-empty ".env" file.`
		);
	}
};

module.exports = {
	setupEnvFile,
};
