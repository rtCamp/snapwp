const { spawnSync } = require( 'child_process' );
const path = require( 'path' );

/**
 * Runs npm install silently in the project directory.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
const runNpmInstall = async ( projectDirPath ) => {
	console.log(
		'Installing NPM dependencies... This may take a few minutes.'
	);

	try {
		// Run npm install with minimal output
		const result = spawnSync(
			'npm',
			[ 'install', '--silent', '--no-fund', '--no-audit' ],
			{
				cwd: projectDirPath,
				stdio: [ 'ignore', 'pipe', 'pipe' ], // Suppress most output
				env: { ...process.env, NPM_CONFIG_LOGLEVEL: 'error' }, // Only show errors
				encoding: 'utf-8', // Get strings instead of Buffers
			}
		);

		// Handle errors
		if ( result.error ) {
			console.error( '\nInstallation failed:', result.error.message );
		} else if ( result.stderr ) {
			console.error(
				'\nInstallation warnings/errors:',
				result.stderr.trim()
			);
		} else {
			console.log( 'Dependencies installed successfully!' );
		}
	} catch ( error ) {
		console.warn( 'Warning: Could not install dependencies.' );
		console.warn(
			'You will need to run "npm install" manually after setup completes.'
		);
		console.warn( `Details: ${ error.message }` );
		// We don't throw the error so the process can continue.
	}
};

module.exports = {
	runNpmInstall,
};
