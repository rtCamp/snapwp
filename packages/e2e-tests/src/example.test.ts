import { expect, test } from '@playwright/test';

test( 'Verify app is running', async ( { page } ) => {
	await page.goto( 'http://localhost:3000' );
	const pageTitle = page.locator( 'h1.wp-block-post-title' );
	await expect( pageTitle ).toHaveText( 'Sample Page' );
} );
