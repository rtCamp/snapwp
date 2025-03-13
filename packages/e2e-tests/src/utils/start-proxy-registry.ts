import { execSync } from 'child_process';

/**
 * Starts the local proxy registry by running the `publish:local` script.
 *
 * @throws If the command fails, an error is logged and rethrown.
 *
 * @return {void}
 */
export default function startProxyRegistry(): void {
	try {
		execSync( 'npm run publish:local', {
			stdio: 'inherit',
		} );
	} catch ( error ) {
		console.error( 'Error setting up proxy registry:', error );
		throw error;
	}
}
