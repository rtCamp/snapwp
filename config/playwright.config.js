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
			name: 'setup wordpress',
			testMatch: /setup-wordpress\.ts/,
		},
		{
			name: 'setup next app',
			testMatch: /setup-next-app\.ts/,
			dependencies: [ 'setup wordpress' ],
		},
		{
			name: 'start next app',
			testMatch: /start-next-app\.ts/,
			dependencies: [ 'setup next app' ],
			teardown: 'teardown',
		},
		{
			name: 'chromium',
			use: { ...devices[ 'Desktop Chrome' ] },
			dependencies: [ 'start next app' ],
		},
		{
			name: 'teardown',
			testMatch: /teardown\.ts/,
		},
	],
} );
