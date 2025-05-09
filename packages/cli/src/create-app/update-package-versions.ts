import fs from 'fs/promises';
import path from 'path';

/**
 * Updates package versions in package.json to use published versions
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
export async function updatePackageVersions(
	projectDirPath: string
): Promise< void > {
	const packageJsonPath = path.join( projectDirPath, 'package.json' );
	const packageJsonData = await fs.readFile( packageJsonPath, {
		encoding: 'utf8',
	} );

	// @todo: This should be the latest version number of the packages.
	const updatedPackageJsonData = packageJsonData.replaceAll(
		/file:..\/..\/..\/packages\/(blocks|query|core|next|codegen-config|eslint-config|prettier-config|plugin-apollo-client)/g,
		'*'
	);

	await fs.writeFile( packageJsonPath, updatedPackageJsonData );
}
