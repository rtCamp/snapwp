const { spawnSync } = require( 'child_process' );
const ora = require( 'ora' ); // Add ora for spinner

/**
 * Runs npm install in the project directory with improved output handling.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {Object} options - Configuration options.
 * @param {boolean} options.skipInstall - Whether to skip the installation step.
 * @return {Promise<boolean>} - Returns true if installation was successful or skipped.
 */
const runNpmInstall = async ( projectDirPath, options = {} ) => {
	// Skip installation if the flag is set
	if ( options.skipInstall ) {
		console.log( 'Skipping NPM dependencies installation...' );
		return true;
	}

	// Initialize spinner but don't start it yet
	const spinner = ora( {
		text: 'Installing NPM dependencies',
		color: 'cyan',
	} );

	try {
		// Start the spinner before running npm install
		spinner.start();

		// Run npm install with controlled output
		const result = spawnSync(
			'npm',
			[ 'install', '--no-fund', '--no-audit' ],
			{
				cwd: projectDirPath,
				stdio: [ 'ignore', 'pipe', 'pipe' ],
				env: { ...process.env, NPM_CONFIG_LOGLEVEL: 'error' },
				encoding: 'utf-8',
			}
		);

		// Handle installation result
		if ( result.error ) {
			spinner.fail( `Installation failed: ${ result.error.message }` );
			return false;
		}

		// Filter and display important error messages
		const errorLines = result.stderr
			? result.stderr.split( '\n' ).filter( ( line ) => {
					// Keep only important messages like security vulnerabilities,
					// missing peer dependencies, and actual errors
					return (
						( line.includes( 'WARN' ) &&
							( line.includes( 'security' ) ||
								line.includes( 'missing peer' ) ) ) ||
						line.includes( 'ERR!' )
					);
			  } )
			: [];

		if ( errorLines.length > 0 ) {
			spinner.warn( 'Dependencies installed with warnings:' );
			errorLines.forEach( ( line ) =>
				console.warn( `  ${ line.trim() }` )
			);
		} else {
			spinner.succeed( 'Dependencies installed successfully!' );
		}

		return true;
	} catch ( error ) {
		spinner.fail( 'Could not install dependencies.' );
		console.warn(
			'You will need to run "npm install" manually after setup completes.'
		);
		console.warn( `Details: ${ error.message }` );
		return false;
	}
};

module.exports = {
	runNpmInstall,
};
