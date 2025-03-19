const fs = require( 'fs/promises' );

/**
 * Creates project directory if it doesn't exist.
 *
 * @param {string} projectDirPath - The path to create.
 * @return {Promise<void>}
 */
const createProjectDirectory = async ( projectDirPath ) => {
	try {
		// Check if the directory exists.
		await fs.access( projectDirPath );
	} catch ( error ) {
		if ( 'ENOENT' !== error.code ) {
			throw error;
		}

		// Create the directory if it doesn't exist.
		await fs.mkdir( projectDirPath, { recursive: true } );
	}
};

module.exports = {
	createProjectDirectory,
};
