const path = require( 'path' );
const fs = require( 'fs/promises' );

/**
 * Updates package versions in package.json to use published versions
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
const updatePackageVersions = async ( projectDirPath ) => {
	const packageJsonPath = path.join( projectDirPath, 'package.json' );
	const packageJsonData = await fs.readFile( packageJsonPath, {
		encoding: 'utf8',
	} );

	// Todo: This should be the latest version number of the packages.
	const updatedPackageJsonData = packageJsonData.replaceAll(
		/file:..\/..\/..\/packages\/(blocks|query|core|next|codegen-config|eslint-config|prettier-config)/g,
		'*'
	);

	await fs.writeFile( packageJsonPath, updatedPackageJsonData );
};

module.exports = {
	updatePackageVersions,
};
