import { execSync } from 'child_process';
import path from 'path';

/**
 * Clones the SnapWP Helper plugin, installs dependencies, and builds it.
 *
 * @throws If any command fails, an error is logged and rethrown.
 */
export default function setupSnapWPHelper(): void {
	const pluginPath = path.join( process.cwd(), 'snapwp-helper' );
	try {
		execSync( 'git clone https://github.com/rtCamp/snapwp-helper.git', {
			stdio: 'inherit',
		} );
		execSync( 'npm run install-local-deps', {
			cwd: pluginPath,
			stdio: 'inherit',
		} );
	} catch ( error ) {
		console.error( 'Error setting up snapwp-helper:', error );
		throw error;
	}
}
