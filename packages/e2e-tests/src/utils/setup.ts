import { test as setup } from '@playwright/test';

import cleanup from './cleanup';
import setupNextApp from './setup-next-app';
import setupWordPress from './setup-wordpress';
import startNextApp from './start-next-app';

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
