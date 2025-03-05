import { execSync } from 'child_process';
import path from 'path';

export default function setupSnapWPHelper() {
	const pluginPath = path.join( process.cwd(), 'snapwp-helper' );
	try {
		execSync( 'git clone https://github.com/rtCamp/snapwp-helper.git', {
			stdio: 'inherit',
		} );
		execSync( 'npm run install-local-deps && npm run build:dist', {
			cwd: pluginPath,
			stdio: 'inherit',
		} );
	} catch ( error ) {
		console.error( 'Error setting up snapwp-helper:', error );
		throw error;
	}
}
