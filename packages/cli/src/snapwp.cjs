#!/usr/bin/env node

// Dependencies
const path = require( 'path' );
const { program } = require( 'commander' );
const { prompt } = require( './utils/prompt.cjs' );
const {
	createProjectDirectory,
} = require( './create-app/createProjectDirectory.cjs' );
const { setupEnvFile } = require( './create-app/setupEnvFile.cjs' );
const {
	copyStarterTemplate,
} = require( './create-app/copyStarterTemplate.cjs' );
const { setupNpmrc } = require( './create-app/setupNpmrc.cjs' );
const {
	updatePackageVersions,
} = require( './create-app/updatePackageVersions.cjs' );
const {
	printSuccessMessage,
} = require( './create-app/printSuccessMessage.cjs' );

/**
 * Default project path if user doesn't provide any.
 */
const DEFAULT_PROJECT_PATH = './snapwp-app';

/**
 * Main function to create a new SnapWP project.
 */

program.option( '--proxy', 'Use proxy registry.' ).parse();

const options = program.opts();

/**
 * Prompts the user for input.
 *
 * @param {string} query Prompt query.
 *
 * @return {Promise<string>} User input.
 */
const prompt = ( query ) => {
	const rl = readline.createInterface( {
		input: process.stdin,
		output: process.stdout,
	} );

	return new Promise( ( resolve ) => {
		rl.question( query, ( answer ) => {
			rl.close();
			if ( answer.includes( '\\n' ) ) {
				answer = answer.split( '\\n' ).join( '\n' );
			}
			resolve( answer );
		} );
	} );
};

/**
 * Opens a file in the default or specified editor and waits for the editor process to exit.
 * This function resolves with a success object indicating the result of the operation.
 *
 * @param {string} filePath - The path to the file to be opened in the editor.
 *
 * @return - A promise that resolves to an object containing:
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

( async () => {
	try {
		program.option( '--proxy', 'Use proxy registry.' ).parse();
		const options = program.opts();

		// Step 1: Get project directory from user
		const projectDir = await prompt(
			'Thanks for using SnapWP!\n' +
				'\nWhere would you like to create your new Headless WordPress frontend?\n' +
				'Please enter a relative or absolute path: ',
			DEFAULT_PROJECT_PATH
		);

		const projectDirPath = path.resolve( projectDir );

		// Check if user is using default path
		const useDefaultPath = projectDir.trim() === DEFAULT_PROJECT_PATH;

		// Step 2: Create project directory
		await createProjectDirectory( projectDirPath );

		// Step 3: Setup environment file
		// @todo:
		//        1. With --interactive: prompt for each env variable value and generate the .env file in projectDirPath.
		//        2. With env variable flags (e.g. --{specific_env_variable}={value}): directly create the .env file using these values.
		//        3. With --env_file: copy the provided .env file path into projectDirPath.
		await setupEnvFile( projectDirPath, false );

		// Step 4: Copy starter template to project directory
		await copyStarterTemplate( projectDirPath );

		// Step 5: Create .npmrc file if needed
		await setupNpmrc( projectDirPath, options.proxy );

		// Step 6: Update package versions
		await updatePackageVersions( projectDirPath );

		// Step 7: Print instructions
		printSuccessMessage( projectDirPath, false );

		if ( useDefaultPath ) {
			process.exit( 1 );
		}
	} catch ( error ) {
		console.error( 'Error:', error );
		process.exit( 1 );
	}
} )();
