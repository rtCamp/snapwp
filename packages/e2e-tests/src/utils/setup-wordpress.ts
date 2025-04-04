import { execSync } from 'child_process';

import setupSnapWPHelper from './setup-snapwp-helper';
import waitForServer from './wait-for-server';

/**
 * Sets up the WordPress environment by starting the server,
 * waiting for it to be available, and configuring permalinks.
 */
export default async function setupWordPress(): Promise< void > {
	console.log( 'Starting WordPress environment...' );

	try {
		setupSnapWPHelper();
		execSync( 'npm run wp-env start', { stdio: 'inherit' } );
		await waitForServer( 'http://localhost:8888/' );
		console.log( 'WordPress is ready!' );

		console.log( "Setting permalinks to 'postname'..." );
		execSync(
			'npm run wp-env run cli -- wp rewrite structure "/%postname%/"',
			{ stdio: 'inherit' }
		);

		console.log( 'Permalinks set successfully!' );
	} catch ( error ) {
		console.error( 'Failed to start WordPress:', error );
		throw error;
	}
}
