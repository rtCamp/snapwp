import { execSync } from 'child_process';
import waitForServer from './wait-for-server';

/**
 * Sets up the WordPress environment by starting the server,
 * waiting for it to be available, and configuring permalinks.
 */
export default async function setupWordPress() {
	console.log( 'Starting WordPress environment...' );

	try {
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
