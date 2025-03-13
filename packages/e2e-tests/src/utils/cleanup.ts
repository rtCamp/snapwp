import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

/**
 * Stops running services and cleans up temporary directories.
 *
 * - Stops Next.js, WordPress (`wp-env`), and the local registry.
 * - Deletes `snapwp-helper` and `test-app` directories if they exist.
 *
 * @return {void}
 */
export default function cleanup(): void {
	try {
		if ( process.env[ 'NEXT_PID' ] ) {
			console.log( 'Stopping Next.js...' );
			process.kill( parseInt( process.env[ 'NEXT_PID' ] ) );
		}

		console.log( 'Stopping WordPress...' );
		execSync( 'npm run wp-env stop', { stdio: 'inherit' } );

		console.log( 'Stopping local registry...' );
		execSync( 'npm run local-registry:stop', { stdio: 'inherit' } );

		const dirsToDelete = [ 'snapwp-helper', 'test-app' ];

		dirsToDelete.forEach( ( dir ) => {
			const dirPath = path.join( process.cwd(), dir );
			if ( fs.existsSync( dirPath ) ) {
				console.log( `Deleting ${ dir } directory...` );
				fs.rmSync( dirPath, { recursive: true, force: true } );
			}
		} );

		console.log( 'Cleanup completed.' );
	} catch ( error ) {
		console.error( 'Error during global teardown:', error );
	}
}
