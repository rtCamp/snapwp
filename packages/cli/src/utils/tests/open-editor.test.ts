import { spawn } from 'child_process';
import path from 'path';
import { openEditor } from '../open-editor';

// Mock 'child_process'
jest.mock( 'child_process', () => ( {
	...jest.requireActual( 'child_process' ),
	spawn: jest.fn(),
} ) );

describe( 'openEditor', () => {
	const mockFilePath = 'test-file.txt';
	const resolvedMockFilePath = path.resolve( mockFilePath );
	let mockSpawnInstance: { on: jest.Mock };
	const originalEnv = { ...process.env }; // Store original environment variables

	beforeEach( () => {
		// Reset environment variables to original state before each test
		process.env = { ...originalEnv };

		// Clear mocks
		( spawn as jest.Mock ).mockClear();

		// Setup a mock spawn instance for each test
		mockSpawnInstance = {
			on: jest.fn( ( event, callback ) => {
				if ( event === 'exit' ) {
					// Simulate successful exit by default
					callback();
				}
				return mockSpawnInstance; // Return for chaining, if any
			} ),
			// Add other properties like stdin, stdout, stderr if they are used by the code
		};
		( spawn as jest.Mock ).mockReturnValue( mockSpawnInstance as any );
	} );

	afterEach( () => {
		// Restore original environment variables after each test
		process.env = originalEnv;
	} );

	it( 'should resolve the file path', async () => {
		await openEditor( mockFilePath );
		expect( spawn ).toHaveBeenCalledWith(
			expect.any( String ),
			[ resolvedMockFilePath ],
			expect.any( Object )
		);
	} );

	it( 'should use VISUAL environment variable if set', async () => {
		// eslint-disable-next-line n/no-process-env -- VISUAL is a common env var for specifying the editor
		process.env[ 'VISUAL' ] = 'code';
		await openEditor( mockFilePath );
		expect( spawn ).toHaveBeenCalledWith(
			'code',
			[ resolvedMockFilePath ],
			{
				stdio: 'inherit',
			}
		);
	} );

	it( 'should use EDITOR environment variable if VISUAL is not set', async () => {
		// eslint-disable-next-line n/no-process-env -- VISUAL is a common env var for specifying the editor
		delete process.env[ 'VISUAL' ]; // Ensure VISUAL is not set
		// eslint-disable-next-line n/no-process-env -- EDITOR is a common env var for specifying the editor
		process.env.EDITOR = 'nano';
		await openEditor( mockFilePath );
		expect( spawn ).toHaveBeenCalledWith(
			'nano',
			[ resolvedMockFilePath ],
			{
				stdio: 'inherit',
			}
		);
	} );

	it( 'should default to "vi" if neither VISUAL nor EDITOR are set', async () => {
		// eslint-disable-next-line n/no-process-env -- VISUAL is a common env var for specifying the editor
		delete process.env[ 'VISUAL' ];
		delete process.env.EDITOR;
		await openEditor( mockFilePath );
		expect( spawn ).toHaveBeenCalledWith( 'vi', [ resolvedMockFilePath ], {
			stdio: 'inherit',
		} );
	} );

	it( 'should resolve with success true and correct message on successful editor exit', async () => {
		const result = await openEditor( mockFilePath );
		expect( result.success ).toBe( true );
		expect( result.message ).toBe(
			`\nFile created at "${ resolvedMockFilePath }"`
		);
		expect( mockSpawnInstance.on ).toHaveBeenCalledWith(
			'exit',
			expect.any( Function )
		);
	} );

	it( 'should resolve with success false and error message if spawn throws an error', async () => {
		const errorMessage = 'Spawn failed';
		( spawn as jest.Mock ).mockImplementation( () => {
			throw new Error( errorMessage );
		} );
		const result = await openEditor( mockFilePath );
		expect( result.success ).toBe( false );
		expect( result.message ).toBe( `\nError: ${ errorMessage }` );
	} );

	it( 'should resolve with success false and generic message for non-Error instance', async () => {
		( spawn as jest.Mock ).mockImplementation( () => {
			throw 'Unknown problem';
		} );
		const result = await openEditor( mockFilePath );
		expect( result.success ).toBe( false );
		expect( result.message ).toBe( '\nAn unknown error occurred.' );
	} );

	it( 'should correctly pass filePath to the editor', async () => {
		const customFilePath = 'src/my-file.js';
		await openEditor( customFilePath );
		expect( spawn ).toHaveBeenCalledWith(
			expect.any( String ),
			[ customFilePath ],
			{ stdio: 'inherit' }
		);
	} );

	it( 'should handle spawn error', async () => {
		const consoleErrorSpy = jest
			.spyOn( console, 'error' )
			.mockImplementation( () => {} );
		mockSpawnInstance.on = jest.fn( ( event, cb ) => {
			if ( event === 'error' ) {
				cb( new Error( 'Spawn error' ) );
			}
			return mockSpawnInstance;
		} );

		await openEditor( mockFilePath );
		expect( consoleErrorSpy ).toHaveBeenCalledWith(
			'Failed to start editor:',
			expect.any( Error )
		);
		consoleErrorSpy.mockRestore();
	} );

	it( 'should handle non-zero exit code', async () => {
		const consoleErrorSpy = jest
			.spyOn( console, 'error' )
			.mockImplementation( () => {} );
		mockSpawnInstance.on = jest.fn( ( event, cb ) => {
			if ( event === 'exit' ) {
				cb( 1 ); // Simulate non-zero exit code
			}
			return mockSpawnInstance;
		} );

		await openEditor( mockFilePath );
		expect( consoleErrorSpy ).toHaveBeenCalledWith(
			'Editor exited with code 1'
		);
		consoleErrorSpy.mockRestore();
	} );
} );
