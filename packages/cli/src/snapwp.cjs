#!/usr/bin/env node
const registryURL = 'http://localhost:4873';
const npmrcContent = `@snapwp:registry=${ registryURL }`;

// Scaffold a new directory with the SnapWP build and the .env file.
const { execSync, spawn } = require( 'child_process' );
const fs = require( 'fs/promises' );
const path = require( 'path' );
const readline = require( 'readline' );
const { program } = require( 'commander' );

program
	.option( '--proxy', 'Use proxy registry.' )
	.requiredOption(
		'--NEXT_PUBLIC_WORDPRESS_URL <string>',
		'WordPress "frontend" domain URL.'
	)
	.requiredOption(
		'--INTROSPECTION_TOKEN <string>',
		'Token used for authenticating GraphQL introspection queries.'
	)
	.option(
		'--NODE_TLS_REJECT_UNAUTHORIZED <string>',
		'Enable if connecting to a self-signed cert.',
		'0'
	)
	.option(
		'--NEXT_PUBLIC_URL <string>',
		'Headless frontend domain URL.',
		'http://localhost:3000'
	)
	.option(
		'--NEXT_PUBLIC_GRAPHQL_ENDPOINT <string>',
		'WordPress GraphQL endpoint.',
		'graphql'
	)
	.option(
		'--NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH <string>',
		'WordPress Uploads directory path.',
		'/wp-content/uploads'
	)
	.option(
		'--NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX <string>',
		'WordPress REST URL Prefix.',
		'/wp-json'
	)
	.parse();

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

			const envFileData =
				`# Enable if connecting to a self-signed cert\n` +
				`NODE_TLS_REJECT_UNAUTHORIZED=${ options.NODE_TLS_REJECT_UNAUTHORIZED }\n\n` +
				`# The headless frontend domain URL. Uncomment this line and ensure the value matches the URL used by your frontend app.\n` +
				`NEXT_PUBLIC_URL=${ options.NEXT_PUBLIC_URL }\n\n` +
				`# The WordPress "frontend" domain URL\n` +
				`NEXT_PUBLIC_WORDPRESS_URL=${ options.NEXT_PUBLIC_WORDPRESS_URL }\n\n` +
				`# The WordPress GraphQL endpoint\n` +
				`NEXT_PUBLIC_GRAPHQL_ENDPOINT=${ options.NEXT_PUBLIC_GRAPHQL_ENDPOINT }\n\n` +
				`# The WordPress Uploads directory path\n` +
				`# NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH=${ options.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH }\n\n` +
				`# The WordPress REST URL Prefix\n` +
				`# NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX=${ options.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX }\n\n` +
				`# Token used for authenticating GraphQL introspection queries\n` +
				`INTROSPECTION_TOKEN=${ options.INTROSPECTION_TOKEN }\n`;

			console.log(
				`\nNo ".env" file found in "${ projectDirPath }". Creating ".env" file.`
			);

			// Create ".env" file.
			await fs.writeFile( envPath, envFileData );
		}

		// Step 3: Copy the _entire_ `nextJsStarterPath` contents to the project directory.
		const nextJSStarterEnvPath = path.join( nextJsStarterPath, '.env' );
		await fs.rm( nextJSStarterEnvPath, { force: true } ); // Delete `.env` from starter if present, to prevent override of `.env`.

		console.log( '' );

		console.log( '📂 Copying frontend folder to project directory...' );
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
			console.log( '' );

			console.log( 'Found --proxy flag, generating `.npmrc` file.' );

			await fs.writeFile(
				path.join( projectDirPath, '.npmrc' ),
				npmrcContent
			);

			console.log( '' );

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
			`✔️ Your project has been scaffolded at: ${ projectDirPath }.`
		);

		// New line for clarity.
		console.log( '' );

		console.log(
			'🚀 To start your headless WordPress project, please run the following commands:'
		);
		console.log( `cd ${ projectDirPath }` );
		console.log( `npm install` );
		console.log( `npm run dev` );
	} catch ( error ) {
		console.error( 'Error:', error );
		process.exit( 1 );
	}
} )();
