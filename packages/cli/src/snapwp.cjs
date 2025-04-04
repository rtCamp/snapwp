#!/usr/bin/env node

// Dependencies
const path = require( 'path' );

const { program } = require( 'commander' );

const {
	copyStarterTemplate,
} = require( './create-app/copyStarterTemplate.cjs' );
const {
	createProjectDirectory,
} = require( './create-app/createProjectDirectory.cjs' );
const {
	printSuccessMessage,
} = require( './create-app/printSuccessMessage.cjs' );
const { setupEnvFile } = require( './create-app/setupEnvFile.cjs' );
const { setupNpmrc } = require( './create-app/setupNpmrc.cjs' );
const {
	updatePackageVersions,
} = require( './create-app/updatePackageVersions.cjs' );
const {
	printSuccessMessage,
} = require( './create-app/printSuccessMessage.cjs' );
const { prompt } = require( './utils/prompt.cjs' );
const { runNpmInstall } = require( './create-app/runNpmInstall.cjs' );

/**
 * Default project path if user doesn't provide any.
 */
const DEFAULT_PROJECT_PATH = './snapwp-app';

/**
 * Main function to create a new SnapWP project.
 */
( async () => {
	try {
		program
			.option( '--proxy', 'Use proxy registry.' )
			.option( '--skip-install', 'Skip installing npm dependencies' )
			.parse();
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
		const useDefaultEnv = false; // This will be updated if you implement the todo items
		await setupEnvFile( projectDirPath, useDefaultEnv );

		// Step 4: Copy starter template to project directory
		await copyStarterTemplate( projectDirPath );

		// Step 5: Create .npmrc file if needed
		await setupNpmrc( projectDirPath, options.proxy );

		// Step 6: Update package versions
		await updatePackageVersions( projectDirPath );

		// Step 7: Install dependencies (skip if flag is set)
		const installSuccess = await runNpmInstall( projectDirPath, {
			skipInstall: options.skipInstall,
		} );

		// Step 8: Print instructions
		printSuccessMessage( projectDirPath, useDefaultEnv, ! installSuccess );

		if ( useDefaultPath ) {
			process.exit( 1 );
		}
	} catch ( error ) {
		console.error( 'Error:', error );
		process.exit( 1 );
	}
} )();
