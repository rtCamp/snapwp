import fs from 'fs/promises';
import path from 'path';
import { openEditor } from '../utils/open-editor';
import { prompt } from '../utils/prompt';

/**
 * Creates the .env file either using the default template or by prompting the user.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {string} envPath - Path to the .env file.
 * @param {boolean} useDefaultEnv - Whether to use a default .env file.
 * @return {Promise<void>}
 */
async function createEnvFile(
	projectDirPath: string,
	envPath: string,
	useDefaultEnv: boolean
): Promise< void > {
	// If using default env, copy .env.example to .env and return
	if ( useDefaultEnv ) {
		const srcPath = path.resolve(
			__dirname,
			'../../../../examples/nextjs/starter/.env.example'
		);
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
	} catch ( error ) {
		if (
			error instanceof Error &&
			( error as NodeJS.ErrnoException ).code === 'ENOENT'
		) {
			throw new Error(
				`".env" still not found at "${ envPath }". Please create an ".env" and try again.`
			);
		}

		throw error;
	}
}

/**
 * Handles the creation and validation of the .env file.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useDefaultEnv - Whether to use a default .env file.
 * @return {Promise<void>}
 */
export async function setupEnvFile(
	projectDirPath: string,
	useDefaultEnv: boolean
): Promise< void > {
	const envPath = path.join( projectDirPath, '.env' );

	try {
		await fs.access( envPath );
	} catch ( error ) {
		if (
			error instanceof Error &&
			( error as NodeJS.ErrnoException ).code !== 'ENOENT'
		) {
			throw error;
		}

		await createEnvFile( projectDirPath, envPath, useDefaultEnv );
	}

	// Verify .env file is not empty
	const { size } = await fs.stat( envPath );

	if ( 0 === size ) {
		await fs.rm( envPath, { force: true } ); // Delete empty file

		throw new Error(
			`An empty ".env" found at "${ envPath }". Please try again with a non-empty ".env" file.`
		);
	}
}
