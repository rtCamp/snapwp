import { printSuccessMessage } from '../print-success-message';

// Mock console.log
const mockConsoleLog = jest
	.spyOn( console, 'log' )
	.mockImplementation( () => {} );

describe( 'printSuccessMessage', () => {
	const mockProjectName = 'my-awesome-app';
	const mockProjectDirPath = `./${ mockProjectName }`; // Added for clarity

	beforeEach( () => {
		mockConsoleLog.mockClear();
	} );

	afterAll( () => {
		mockConsoleLog.mockRestore();
	} );

	it( 'should print the correct success message to the console when default env is used and manual install is not needed', () => {
		printSuccessMessage( mockProjectDirPath, true, false );

		// Check that console.log was called
		expect( mockConsoleLog ).toHaveBeenCalled();

		const calls = mockConsoleLog.mock.calls;
		const consoleOutput = calls.map( ( call ) => call[ 0 ] ).join( '\n' );

		expect( consoleOutput ).toContain(
			`Your project has been scaffolded at: ${ mockProjectDirPath }.`
		);
		expect( consoleOutput ).toContain(
			'For setting up environment variables, please refer to the documentation'
		);
		expect( consoleOutput ).toContain(
			'To start your headless WordPress project, please run the following commands:'
		);
		expect( consoleOutput ).toContain( `cd ${ mockProjectDirPath }` );
		expect( consoleOutput ).toContain( 'npm run dev' );
		expect( consoleOutput ).not.toContain( 'npm install' );
	} );

	it( 'should include npm install if needsManualInstall is true', () => {
		printSuccessMessage( mockProjectDirPath, false, true );
		const calls = mockConsoleLog.mock.calls;
		const consoleOutput = calls.map( ( call ) => call[ 0 ] ).join( '\n' );

		expect( consoleOutput ).toContain( `cd ${ mockProjectDirPath }` );
		expect( consoleOutput ).toContain( 'npm install' );
		expect( consoleOutput ).toContain( 'npm run dev' );
		expect( consoleOutput ).not.toContain(
			'For setting up environment variables, please refer to the documentation'
		);
	} );
} );
