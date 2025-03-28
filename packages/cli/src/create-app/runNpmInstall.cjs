const { execSync } = require( 'child_process' );
const path = require( 'path' );

/**
 * Runs npm install silently in the project directory.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
const runNpmInstall = async ( projectDirPath ) => {
	console.log( 'Installing dependencies... This may take a few moments.' );

	try {
		// Run npm install with minimal output
		execSync( 'npm install --silent --no-fund --no-audit', {
			cwd: projectDirPath,
			stdio: [ 'ignore', 'pipe', 'pipe' ], // Suppress most output
			env: { ...process.env, NPM_CONFIG_LOGLEVEL: 'error' }, // Only show errors
		} );

		console.log( 'Dependencies installed successfully!' );
	} catch ( error ) {
		console.warn(
			'Warning: Could not automatically install dependencies.'
		);
		console.warn(
			'You will need to run "npm install" manually after setup completes.'
		);
		// We don't throw the error so the process can continue
	}
};

module.exports = {
	runNpmInstall,
};
