import { execSync } from 'child_process';
import { test as teardown } from '@playwright/test';

teardown( 'shut down WordPress and the Next.js app', () => {
	teardown.setTimeout( 600000 );
	try {
		if ( process.env[ 'NEXT_PID' ] ) {
			console.log( 'Stopping Next.js...' );
			process.kill( parseInt( process.env[ 'NEXT_PID' ] ) );
		}

		console.log( 'Stopping WordPress...' );
		execSync( 'npm run wp-env stop', { stdio: 'inherit' } );

		console.log( 'Cleanup completed.' );
	} catch ( error ) {
		console.error( 'Error during global teardown:', error );
	}
} );
