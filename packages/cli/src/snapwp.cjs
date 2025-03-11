#!/usr/bin/env node
const registryURL = 'http://localhost:4873';
const npmrcContent = `@snapwp:registry=${ registryURL }`;

// Scaffold a new directory with the SnapWP build and the .env file.
const { spawn } = require( 'child_process' );
const fs = require( 'fs/promises' );
const path = require( 'path' );
const readline = require( 'readline' );
const { program } = require( 'commander' );

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
 * @param filePath - The path to the file to be opened in the editor.
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
		let useDefaultPath = false;
		let projectPath = './snapwp-frontend';
		// Step 1: Prompt the user to input the directory where the project needs to be scaffolded.
		const projectDir = await prompt(
			'Thanks for using SnapWP!\n' +
				'\nWhere would you like to create your new Headless WordPress frontend?\n' +
				'Please enter a relative or absolute path: '
		);
		if ( projectDir.trim() === '' ) {
			useDefaultPath = true;
			console.log(
				`\nUsing default values, your project directory will be created at ${ projectPath } path.\n`
			);
		} else {
			projectPath = projectDir;
		}

		const projectDirPath = path.resolve( projectPath );

		// Create the project directory if not exists.
		try {
			await fs.access( projectDirPath );
		} catch ( error ) {
			if ( 'ENOENT' !== error.code ) {
				console.error( 'Error:', error );
				process.exit( 1 );
			}

			await fs.mkdir( projectDirPath, { recursive: true } );
		}

		const nextJsStarterPath = path.resolve(
			__dirname,
			'./examples/nextjs/starter/'
		);

		// @todo: Add interactive support to prompt for the env variable values one-at-a-time, create `.env` file using it in projectDirPath if --interactive is passed & skip `Step 2`.

		// @todo: Create `.env` file directly with env_variables if --{specific_env_variable}={value} or --interactive is passed & skip `Step 2`.

		// @todo: Copy `.env` file to projectDirPath if file-path passed via --env_file={string or path} & skip `Step 2`.

		// Step 2: Check if there is an `.env` file in projectDirPath.
		const envPath = path.join( projectDirPath, '.env' );

		try {
			await fs.access( envPath );
		} catch ( error ) {
			if ( 'ENOENT' !== error.code ) {
				console.error( 'Error:', error );
				process.exit( 1 );
			}

			if ( ! useDefaultPath ) {
				await prompt(
					`\nNo .env file found in "${ projectDirPath }". Please \n` +
						'  1. Press any key to open a new .env file in your default editor,\n' +
						'  2. Paste in the environment variables from your WordPress site, and update the values as needed. \n' +
						'  3. Save and close the file to continue the installation. \n' +
						'\n (For more information on configuring your .env file, see the SnapWP documentation.)' // @todo Update with the link to the documentation.
				);

				/**
				 * Create an empty file before opening to prevent: "saving file with default editor extension".
				 * E.g.,
				 * In Windows, if notepad is default editor, it saves files in `.txt` extension by default.
				 * Creating a file before opening will prevent bugs due to default editor extensions.
				 */
				await fs.writeFile( envPath, '' );

				const envFileCreationStatus = await openEditor( envPath );

				if ( envFileCreationStatus.success ) {
					console.log( envFileCreationStatus.message );
				} else {
					console.error( envFileCreationStatus.message );
					process.exit( 1 );
				}

				// Throw error if .env file still does not exist or if exists, its empty.
				try {
					await fs.access( envPath );
				} catch ( err ) {
					// Throw error if .env file still does not exist.
					if ( 'ENOENT' === err.code ) {
						console.error(
							`".env" still not found at "${ envPath }". Please create an ".env" and try again.`
						);
						process.exit( 1 );
					}

					// Exit if any other unknown error occurred.
					console.error( 'Error:', err );
					process.exit( 1 );
				}
			} else {
				//copy .env.example to .env of the directory
				const srcPath = path.resolve(
					__dirname,
					'../../../.env.example'
				);

				const destPath = path.resolve( envPath );
				await fs.cp( srcPath, destPath );
			}
		}

		// Fetch the `.env` file size.
		const { size } = await fs.stat( envPath );

		// Throw error if .env file is empty.
		if ( 0 === size ) {
			console.error(
				`An empty ".env" found at "${ envPath }". Please try again with a non-empty ".env" file.`
			);

			await fs.rm( envPath, { force: true } ); // Delete old env for a fresh start.

			process.exit( 1 );
		}
		// Step 3: Copy the _entire_ `nextJsStarterPath` contents to the project directory.
		const nextJSStarterEnvPath = path.join( nextJsStarterPath, '.env' );
		await fs.rm( nextJSStarterEnvPath, { force: true } ); // Delete `.env` from starter if present, to prevent override of `.env`.

		console.log( 'Copying frontend folder to project directory...' );
		await fs.cp( nextJsStarterPath, projectDirPath, {
			recursive: true,
			filter: ( source ) => {
				const fileCheck = new RegExp(
					`/${ nextJsStarterPath }/(node_modules|package-lock\.json|\.env|\.next|next-env\.d\.ts|src\/__generated)$`
				);
				return ! fileCheck.test( source );
			},
		} );

		// Step 4: Create .npmrc file in project directory if running via proxy registry.
		if ( options.proxy ) {
			console.log( 'Found --proxy flag, generating `.npmrc` file.' );
			await fs.writeFile(
				path.join( projectDirPath, '.npmrc' ),
				npmrcContent
			);
			console.log(
				`\`.npmrc\` file generated successfully. Please make sure the proxy registry is running on ${ registryURL }`
			);
		}

		// Step 5: update @snapwp package version numbers in package.json.
		const packageJsonData = await fs.readFile(
			path.join( projectDirPath, 'package.json' ),
			{ encoding: 'utf8' }
		);
		const updatedPackageJsonData = packageJsonData.replaceAll(
			/file:..\/..\/..\/packages\/(blocks|query|core|next|codegen-config|eslint-config|prettier-config)/g,
			'*'
		);
		await fs.writeFile(
			path.join( projectDirPath, 'package.json' ),
			updatedPackageJsonData
		);

		// New line for clarity.
		console.log( '' );

		console.log(
			`Your project has been scaffolded at: ${ projectDirPath }.`
		);

		// New line for clarity.
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
		console.log( `npm install` );
		console.log( `npm run dev` );
		if ( useDefaultPath ) {
			process.exit( 1 );
		}
	} catch ( error ) {
		console.error( 'Error:', error );
		process.exit( 1 );
	}
} )();
