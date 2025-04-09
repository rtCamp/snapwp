import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const EXCLUDED_FILES_PATTERN =
	/\/(node_modules|package-lock\.json|\.env|\.next|next-env\.d\.ts|src\/__generated)$/;

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

/**
 * Copies starter template to project directory.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @return {Promise<void>}
 */
export async function copyStarterTemplate(
	projectDirPath: string
): Promise< void > {
	const nextJsStarterPath = path.resolve(
		__dirname,
		'../examples/nextjs/starter/'
	);

	const nextJSStarterEnvPath = path.join( nextJsStarterPath, '.env' );

	// Delete .env from starter if present, to prevent override
	await fs.rm( nextJSStarterEnvPath, { force: true } );

	console.log( '' );
	console.log( 'Copying frontend folder to project directory...' );
	await fs.cp( nextJsStarterPath, projectDirPath, {
		recursive: true,

		/**
		 * Excludes specific files from copying.
		 * @param {string} source - File or directory path.
		 * @return {boolean} - Whether to include the file.
		 */
		filter: ( source: string ) => {
			const fileCheck = new RegExp(
				`/${ nextJsStarterPath }${ EXCLUDED_FILES_PATTERN.source }`
			);
			return ! fileCheck.test( source );
		},
	} );
}
