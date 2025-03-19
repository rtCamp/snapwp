const path = require( 'path' );
const fs = require( 'fs/promises' );

const REGISTRY_URL = 'http://localhost:4873';
const NPMRC_CONTENT = `@snapwp:registry=${ REGISTRY_URL }`;

/**
 * Creates .npmrc file for proxy registry if needed.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useProxy - Whether to use the proxy registry.
 * @return {Promise<void>}
 */
const setupNpmrc = async ( projectDirPath, useProxy ) => {
	if ( useProxy ) {
		console.log( 'Found --proxy flag, generating `.npmrc` file.' );

		await fs.writeFile(
			path.join( projectDirPath, '.npmrc' ),
			NPMRC_CONTENT
		);

		console.log(
			`\`.npmrc\` file generated successfully. Please make sure the proxy registry is running on ${ REGISTRY_URL }`
		);
	}
};

module.exports = {
	setupNpmrc,
};
