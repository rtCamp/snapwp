import fs from 'fs';
import path from 'path';
import url from 'url';

/**
 * @return path to snapwp config file.
 */
export default function getSnapWPConfigPath(): string {
	const possibleSnapWPConfigPaths = [
		'snapwp.config.ts',
		'snapwp.config.js',
		'snapwp.config.mjs',
	];

	// Locate the SnapWP configuration file.
	let snapWPConfigPath = possibleSnapWPConfigPaths.find(
		( possibleSnapWPConfigPath ) => {
			return fs.existsSync(
				`${ process.cwd() }/${ possibleSnapWPConfigPath }`
			);
		}
	);

	if ( ! snapWPConfigPath ) {
		throw new Error( 'SnapWP configuration file not found.' );
	}

	// Use path.normalize to replace backslashes correctly
	snapWPConfigPath = path.normalize(
		`${ process.cwd() }/${ snapWPConfigPath }`
	);
	// Convert it to a file:// URL
	snapWPConfigPath = url.pathToFileURL( snapWPConfigPath ).href;

	return snapWPConfigPath;
}
