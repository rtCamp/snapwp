import { defineConfig, devices } from '@playwright/test';

export default defineConfig( {
	testDir: '../packages/e2e-tests/src',
	fullyParallel: true,
	forbidOnly: !! process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'dot' : 'list',
	use: {
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'setup wordpress and next app',
			testMatch: /setup\.ts/,
			teardown: 'teardown',
		},
		{
			name: 'chromium',
			use: { ...devices[ 'Desktop Chrome' ] },
			dependencies: [ 'setup wordpress and next app' ],
		},
		{
			name: 'teardown',
			testMatch: /teardown\.ts/,
		},
	],
} );
