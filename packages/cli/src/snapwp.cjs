#!/usr/bin/env node

// Dependencies
const path = require( 'path' );
const { program } = require( 'commander' );
const { DEFAULT_PROJECT_PATH } = require( './constant.cjs' );
const { prompt } = require( './utils/prompt.cjs' );
const {
	createProjectDirectory,
} = require( './utils/createProjectDirectory.cjs' );
const { setupEnvFile } = require( './utils/setupEnv.cjs' );
const { copyStarterTemplate } = require( './utils/copyStarterTemplate.cjs' );
const { setupNpmrc } = require( './utils/setupNpmrc.cjs' );
const { updatePackageVersions } = require( './utils/updatePackagVersion.cjs' );
const { printInstructions } = require( './utils/printInstructions.cjs' );

/**
 * Main function to orchestrate the scaffolding process.
 */
( async () => {
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
} )();
