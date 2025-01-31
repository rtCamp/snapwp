#!/usr/bin/env node
const registryURL = 'http://localhost:4873';
const npmrcContent = `@snapwp:registry=${ registryURL }`;

// Scaffold a new directory with the SnapWP build and the .env file.
const { execSync, spawn } = require( 'child_process' );
const fs = require( 'fs' );
const path = require( 'path' );
const readline = require( 'readline' );
const { program } = require( 'commander' );

program.option( '--proxy', 'Use proxy registry.' ).parse();

const options = program.opts();

// Utility function to execute shell commands
/**
 *
 * @param command
 * @param options
 */
const exec = ( command, options = {} ) => {
	console.log( `Executing: ${ command }` );
	execSync( command, {
		stdio: 'inherit',
		shell: true,
		env: { ...process.env, PATH: process.env.PATH },
		...options,
	} );
};

// Prompt the user for input
/**
 *
 * @param query
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

			child.on( 'exit', function ( e, code ) {
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
		// Step 1: Prompt the user to input the directory where the project needs to be scaffolded.
		const projectDir = await prompt(
			'🫰 🫰 🫰  Thanks for using SnapWP! 🫰 🫰 🫰\n' +
				'\nWhere would you like to create your new Headless WordPress frontend?\n' +
				'Please enter a relative or absolute path: '
		);
		const projectDirPath = path.resolve( projectDir );

		// Create the project directory if not exists.
		if ( ! fs.existsSync( projectDirPath ) ) {
			fs.mkdirSync( projectDirPath, { recursive: true } );
		}

		const nextJsStarterPath = path.resolve(
			__dirname,
			'./examples/nextjs/starter/'
		);

		// Step 2: Copy the _entire_ `nextJsStarterPath` contents to the project directory.
		const nextJSStarterEnvPath = path.join( nextJsStarterPath, '.env' );
		fs.rmSync( nextJSStarterEnvPath, { force: true } ); // Delete `.env` from starter if present, to prevent override of `.env`.

		console.log( '📂 Copying frontend folder to project directory...' );
		await fs.cp(
			nextJsStarterPath,
			projectDirPath,
			{
				recursive: true,
				filter: ( source ) =>
					! /.*(node_modules|package-lock.json)/g.test( source ),
			},
			( error ) => {
				if ( ! error ) {
					return;
				}

				console.log( 'Error: ', error );
				process.exit( 1 );
			}
		);

		// @todo: Add interactive support to prompt for the env variable values one-at-a-time, create `.env` file using it in projectDirPath if --interactive is passed & skip `Step 3`.

		// @todo: Create `.env` file directly with env_variables if --{specific_env_variable}={value} or --interactive is passed & skip `Step 3`.

		// @todo: Copy `.env` file to projectDirPath if file-path passed via --env_file={string or path} & skip `Step 3`.

		// Step 3: Check if there is an `.env` file in projectDirPath.
		const envPath = path.join( projectDirPath, '.env' );

		if ( ! fs.existsSync( envPath ) ) {
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
			fs.closeSync( fs.openSync( envPath, 'w' ) );

			const envFileCreationStatus = await openEditor( envPath );

			if ( envFileCreationStatus.success ) {
				console.log( envFileCreationStatus.message );
			} else {
				console.error( envFileCreationStatus.message );
				process.exit( 1 );
			}

			// Throw error if .env file still does not exist or if exists, its empty.
			if (
				! fs.existsSync( envPath ) ||
				0 === fs.statSync( envPath ).size
			) {
				console.error(
					`".env" still not found at "${ envPath }" or is empty. Please create an ".env" and try again.`
				);

				fs.rmSync( envPath, { force: true } ); // Delete old env for a fresh start.

				process.exit( 1 );
			}
		}

		// Step 4: Create .npmrc file in project directory if running via proxy registry.
		if ( options.proxy ) {
			console.log( 'Found --proxy flag, generating `.npmrc` file.' );
			fs.writeFileSync(
				path.join( projectDirPath, '.npmrc' ),
				npmrcContent
			);
			console.log(
				`\`.npmrc\` file generated successfully. Please make sure the proxy registry is running on ${ registryURL }`
			);
		}

		// Step 5: update @snapwp package version numbers in package.json.
		const packageJsonData = fs.readFileSync(
			path.join( projectDirPath, 'package.json' ),
			{ encoding: 'utf8' }
		);
		const updatedPackageJsonData = packageJsonData.replaceAll(
			/file:..\/..\/..\/packages\/(blocks|query|core|next|codegen-config|eslint-config|prettier-config)/g,
			'*'
		);
		fs.writeFileSync(
			path.join( projectDirPath, 'package.json' ),
			updatedPackageJsonData
		);

		// Step 6: CD into project directory and run `npm install && npm run build` to build the frontend.
		exec( 'npm install', { cwd: projectDirPath } );
		exec( 'npm run build', { cwd: projectDirPath } );
		console.log( '🌐 Built example frontend.' );

		console.log(
			`✔️ Your project has been scaffolded at: ${ projectDirPath }.`
		);
		// New line for clarity.
		console.log( '' );
		console.log(
			`🚀 To start your headless WordPress project, please navigate to ${ projectDirPath } ` +
				'and run `npm run start`.'
		);
	} catch ( error ) {
		console.error( 'Error:', error );
		process.exit( 1 );
	}
} )();
