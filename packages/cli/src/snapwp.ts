#!/usr/bin/env node

// Dependencies
import path from 'path';
import { program } from 'commander';
import prompt from './utils/prompt';
import createProjectDirectory from './create-app/create-project-directory';
import setupEnvFile from './create-app/setup-env-file';
import copyStarterTemplate from './create-app/copy-starter-template';
import setupNpmrc from './create-app/setup-npmrc';
import updatePackageVersions from './create-app/update-package-versions';
import printSuccessMessage from './create-app/print-success-message';

/**
 * Default project path if user doesn't provide any.
 */
const DEFAULT_PROJECT_PATH = './snapwp-app';

/**
 * Main function to create a new SnapWP project.
 */
( async (): Promise< void > => {
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
		await setupNpmrc( projectDirPath, options[ 'proxy' ] );

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
