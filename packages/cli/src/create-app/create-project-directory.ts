import fs from 'fs/promises';

/**
 * Creates project directory if it doesn't exist.
 *
 * @param {string} projectDirPath - The path to create.
 * @return {Promise<void>}
 */
export default async function createProjectDirectory(
	projectDirPath: string
): Promise< void > {
	try {
		// Check if the directory exists.
		await fs.access( projectDirPath );
	} catch ( error ) {
		if (
			error instanceof Error &&
			( error as NodeJS.ErrnoException ).code !== 'ENOENT'
		) {
			throw error;
		}

		// Create the directory if it doesn't exist.
		await fs.mkdir( projectDirPath, { recursive: true } );
	}
}
