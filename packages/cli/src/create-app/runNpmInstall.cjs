const { spawn } = require( 'child_process' );

/**
 * Runs npm install in the project directory with improved output handling.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @returns {Promise<void>} A promise that resolves when installation completes successfully.
 * @throws {Error} When installation fails or is cancelled.
 */
const runNpmInstall = async ( projectDirPath ) => {
	// Dynamically import ora
	const { default: ora } = await import( 'ora' );

	// Initialize spinner
	const spinner = ora( {
		text: 'Installing NPM dependencies',
		color: 'cyan',
		spinner: 'dots',
	} );

	return new Promise( ( resolve, reject ) => {
		// Start the spinner before running npm install
		spinner.start();

		// Use spawn for non-blocking operation
		const npmProcess = spawn(
			'npm',
			[ 'install', '--no-fund', '--no-audit' ],
			{
				cwd: projectDirPath,
				stdio: [ 'ignore', 'pipe', 'pipe' ],
				env: { ...process.env, NPM_CONFIG_LOGLEVEL: 'error' },
			}
		);

		// Buffer for collecting output
		const output = {
			stdout: '',
			stderr: '',
		};

		// Collect stdout data
		npmProcess.stdout.on( 'data', ( data ) => {
			output.stdout += data.toString();
		} );

		// Collect stderr data
		npmProcess.stderr.on( 'data', ( data ) => {
			output.stderr += data.toString();
		} );

		// Handler for termination signals
		const handleTermination = () => {
			if ( npmProcess && ! npmProcess.killed ) {
				npmProcess.kill( 'SIGTERM' );
			}
			spinner.stop();
			console.log( '\n❌ Installation cancelled by user' );
			reject( new Error( 'Installation cancelled by user' ) );
		};

		// Register signal handlers (using once to ensure they only run once)
		process.once( 'SIGINT', handleTermination );
		process.once( 'SIGTERM', handleTermination );

		// Clean up event handlers when npm process completes
		const cleanup = () => {
			process.off( 'SIGINT', handleTermination );
			process.off( 'SIGTERM', handleTermination );
		};

		// Handle process completion
		npmProcess.on( 'close', ( code ) => {
			cleanup();

			if ( code !== 0 ) {
				spinner.fail( 'Could not install dependencies.' );
				console.warn(
					'You will need to run "npm install" manually after setup completes.'
				);
				console.warn( `npm exited with code ${ code }` );
				return reject(
					new Error( `npm install exited with code ${ code }` )
				);
			}

			// Filter and display important error messages
			const errorLines = output.stderr
				? output.stderr
						.split( '\n' )
						.filter( ( line ) => {
							// Keep only important messages like security vulnerabilities,
							// missing peer dependencies, and actual errors
							return (
								( line.includes( 'WARN' ) &&
									( line.includes( 'security' ) ||
										line.includes( 'missing peer' ) ) ) ||
								line.includes( 'ERR!' )
							);
						} )
						.filter( Boolean ) // Remove empty lines
				: [];

			if ( errorLines.length > 0 ) {
				spinner.warn( 'Dependencies installed with warnings:' );
				errorLines.forEach( ( line ) =>
					console.warn( `  ${ line.trim() }` )
				);
			} else {
				spinner.succeed( 'Dependencies installed successfully!' );
			}

			resolve();
		} );

		// Handle errors with the npm process itself
		npmProcess.on( 'error', ( error ) => {
			cleanup();
			spinner.fail( 'Could not install dependencies.' );
			console.warn(
				'You will need to run "npm install" manually after setup completes.'
			);
			console.warn( `Details: ${ error.message }` );
			reject( error );
		} );
	} );
};

module.exports = {
	runNpmInstall,
};
