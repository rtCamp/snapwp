const path = require( 'path' );
const fs = require( 'fs/promises' );
const { EXCLUDED_FILES_PATTERN } = require( '../constant.cjs' );

/**
 * Copies starter template to project directory.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
const copyStarterTemplate = async ( projectDirPath ) => {
	const nextJsStarterPath = path.resolve(
		__dirname,
		'../examples/nextjs/starter/'
	);

	const nextJSStarterEnvPath = path.join( nextJsStarterPath, '.env' );

	// Delete .env from starter if present, to prevent override
	await fs.rm( nextJSStarterEnvPath, { force: true } );

	console.log( 'Copying frontend folder to project directory...' );
	await fs.cp( nextJsStarterPath, projectDirPath, {
		recursive: true,
		filter: ( source ) => {
			const fileCheck = new RegExp(
				`/${ nextJsStarterPath }${ EXCLUDED_FILES_PATTERN.source }`
			);
			return ! fileCheck.test( source );
		},
	} );
};
module.exports = {
	copyStarterTemplate,
};
