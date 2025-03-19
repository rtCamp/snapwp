const fs = require( 'fs/promises' );

/**
 * Creates project directory if it doesn't exist.
 *
 * @param {string} projectDirPath - The path to create.
 * @return {Promise<void>}
 */
const createProjectDirectory = async ( projectDirPath ) => {
	try {
		await fs.access( projectDirPath );
	} catch ( error ) {
		if ( 'ENOENT' !== error.code ) {
			throw error;
		}

		await fs.mkdir( projectDirPath, { recursive: true } );
	}
};

module.exports = {
	createProjectDirectory,
};
