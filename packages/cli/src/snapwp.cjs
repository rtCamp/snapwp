#!/usr/bin/env node

// Dependencies
const { spawn } = require( 'child_process' );
const fs = require( 'fs/promises' );
const path = require( 'path' );
const readline = require( 'readline' );
const { program } = require( 'commander' );

// Constants
const REGISTRY_URL = 'http://localhost:4873';
const NPMRC_CONTENT = `@snapwp:registry=${ REGISTRY_URL }`;
const DEFAULT_PROJECT_PATH = './snapwp-frontend';
const EXCLUDED_FILES_PATTERN =
	/\/(node_modules|package-lock\.json|\.env|\.next|next-env\.d\.ts|src\/__generated)$/;

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
			query + ( !! defaultValue ? ` (${ defaultValue })` : '' ),
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
 * Creates project directory if it doesn't exist.
 *
 * @param {string} projectDirPath - The path to create.
 * @return {Promise<void>}
 */
const createProjectDirectory = async ( projectDirPath ) => {
	try {
		await fs.access( projectDirPath );
	} catch ( error ) {
		if ( 'ENOENT' !== error.code ) {
			throw error;
		}

		await fs.mkdir( projectDirPath, { recursive: true } );
	}
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
			const srcPath = path.resolve( __dirname, '../../../.env.example' );
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

/**
 * Copies starter template to project directory.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
const copyStarterTemplate = async ( projectDirPath ) => {
	const nextJsStarterPath = path.resolve(
		__dirname,
		'./examples/nextjs/starter/'
	);

	const nextJSStarterEnvPath = path.join( nextJsStarterPath, '.env' );

	// Delete .env from starter if present, to prevent override
	await fs.rm( nextJSStarterEnvPath, { force: true } );

	console.log( 'Copying frontend folder to project directory...' );
	await fs.cp( nextJsStarterPath, projectDirPath, {
		recursive: true,
		filter: ( source ) => {
			const fileCheck = new RegExp(
				`/${ nextJsStarterPath }${ EXCLUDED_FILES_PATTERN.source }`
			);
			return ! fileCheck.test( source );
		},
	} );
};

/**
 * Updates package versions in package.json to use published versions
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
const updatePackageVersions = async ( projectDirPath ) => {
	const packageJsonPath = path.join( projectDirPath, 'package.json' );
	const packageJsonData = await fs.readFile( packageJsonPath, {
		encoding: 'utf8',
	} );

	// Todo: This should be the latest version number of the packages.
	const updatedPackageJsonData = packageJsonData.replaceAll(
		/file:..\/..\/..\/packages\/(blocks|query|core|next|codegen-config|eslint-config|prettier-config)/g,
		'*'
	);

	await fs.writeFile( packageJsonPath, updatedPackageJsonData );
};

/**
 * Creates .npmrc file for proxy registry if needed.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useProxy - Whether to use the proxy registry.
 * @return {Promise<void>}
 */
const setupNpmrc = async ( projectDirPath, useProxy ) => {
	if ( useProxy ) {
		console.log( 'Found --proxy flag, generating `.npmrc` file.' );
		await fs.writeFile(
			path.join( projectDirPath, '.npmrc' ),
			NPMRC_CONTENT
		);
		console.log(
			`\`.npmrc\` file generated successfully. Please make sure the proxy registry is running on ${ REGISTRY_URL }`
		);
	}
};

/**
 * Prints the final instructions for the user.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useDefaultPath - Whether using default path or not.
 */
const printInstructions = ( projectDirPath, useDefaultPath ) => {
	console.log( '' );
	console.log( `Your project has been scaffolded at: ${ projectDirPath }.` );
	console.log( '' );

	if ( useDefaultPath ) {
		console.log(
			'For setting up environment variables, please refer to the documentation at: https://github.com/rtCamp/snapwp/blob/b7c0472d95be624244ad2a5d01d4bcdaa29e91f3/packages/cli/README.md'
		);
		console.log( '' );
	}

	console.log(
		'To start your headless WordPress project, please run the following commands:'
	);
	console.log( `cd ${ projectDirPath }` );
	console.log( 'npm install' );
	console.log( 'npm run dev' );
};

/**
 * Main function to orchestrate the scaffolding process.
 */
const scaffoldProject = async () => {
	try {
		program.option( '--proxy', 'Use proxy registry.' ).parse();
		const options = program.opts();

		let useDefaultPath = false;

		// Step 1: Get project directory from user
		const projectDir = await prompt(
			'Thanks for using SnapWP!\n' +
				'\nWhere would you like to create your new Headless WordPress frontend?\n' +
				'Please enter a relative or absolute path: ',
			DEFAULT_PROJECT_PATH
		);

		// Check if user is using default path
		if ( projectDir.trim() === DEFAULT_PROJECT_PATH ) {
			useDefaultPath = true;
		}

		const projectDirPath = path.resolve( projectDir );

		// Step 2: Create project directory
		await createProjectDirectory( projectDirPath );

		// Step 3: Setup environment file
		// @todo:
		//        1. With --interactive: prompt for each env variable value and generate the .env file in projectDirPath.
		//        2. With env variable flags (e.g. --{specific_env_variable}={value}): directly create the .env file using these values.
		//        3. With --env_file: copy the provided .env file path into projectDirPath.

		await setupEnvFile( projectDirPath, useDefaultPath );

		// Step 4: Copy starter template to project directory
		await copyStarterTemplate( projectDirPath );

		// Step 5: Create .npmrc file if needed
		await setupNpmrc( projectDirPath, options.proxy );

		// Step 6: Update package versions
		await updatePackageVersions( projectDirPath );

		// Step 7: Print instructions
		printInstructions( projectDirPath, useDefaultPath );

		if ( useDefaultPath ) {
			process.exit( 1 );
		}
	} catch ( error ) {
		console.error( 'Error:', error );
		process.exit( 1 );
	}
};

// Run the script
scaffoldProject();
