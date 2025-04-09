import fs from 'fs/promises';
import path from 'path';

const REGISTRY_URL = 'http://localhost:4873';
const NPMRC_CONTENT = `@snapwp:registry=${ REGISTRY_URL }`;

/**
 * Creates .npmrc file for proxy registry if needed.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useProxy - Whether to use the proxy registry.
 * @return {Promise<void>}
 */
export async function setupNpmrc(
	projectDirPath: string,
	useProxy: boolean
): Promise< void > {
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
}
