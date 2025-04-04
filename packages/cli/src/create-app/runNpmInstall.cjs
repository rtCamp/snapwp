const { spawnSync } = require( 'child_process' );
const ora = require( 'ora' );

/**
 * Runs npm install in the project directory with improved output handling.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @throws {Error} - Throws an error if installation fails.
 */
const runNpmInstall = async ( projectDirPath ) => {
	// Initialize spinner
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
			throw new Error( `Installation failed: ${ result.error.message }` );
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
	} catch ( error ) {
		spinner.fail( 'Could not install dependencies.' );
		console.warn(
			'You will need to run "npm install" manually after setup completes.'
		);
		console.warn( `Details: ${ error.message }` );
		throw error;
	}
};

module.exports = {
	runNpmInstall,
};
