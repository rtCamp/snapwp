import { test as setup } from '@playwright/test';
import setupWordPress from './setup-wordpress';
import setupNextApp from './setup-next-app';
import startNextApp from './start-next-app';
import cleanup from './cleanup';

setup( 'setup WordPress and the Next.js app', async () => {
	setup.setTimeout( 600000 );
	try {
		await setupWordPress();
		await setupNextApp();
		await startNextApp();
		console.log( 'Environment setup complete!' );
	} catch ( error ) {
		console.error( 'Environment setup failed:', error );
		cleanup();
		process.exit( 1 );
	}
} );
