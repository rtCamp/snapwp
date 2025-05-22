import { execSync } from 'child_process';
import path from 'path';
import { runNpmInstall } from '../run-npm-install'; // Corrected import name

// Mock 'child_process.execSync'
jest.mock( 'child_process', () => ( {
	...jest.requireActual( 'child_process' ), // Import and retain default behavior
	execSync: jest.fn(),
} ) );

// Mock 'ora'
jest.mock( 'ora', () => {
	const mockOra = {
		start: jest.fn().mockReturnThis(),
		succeed: jest.fn().mockReturnThis(),
		fail: jest.fn().mockReturnThis(),
		stop: jest.fn().mockReturnThis(),
	};
	return jest.fn( () => mockOra );
} );

describe( 'runNpmInstall', () => {
	const mockProjectName = 'test-npm-install';
	const mockProjectPath = path.join( process.cwd(), mockProjectName );

	beforeEach( () => {
		( execSync as jest.Mock ).mockClear();
	} );

	it( 'should run "npm install" in the project directory', () => {
		( execSync as jest.Mock ).mockReturnValue(
			Buffer.from( 'npm install output' )
		);

		runNpmInstall( mockProjectName );

		expect( execSync ).toHaveBeenCalledWith( 'npm install', {
			cwd: mockProjectPath,
			stdio: 'inherit',
		} );
	} );

	it( 'should throw an error if "npm install" fails', () => {
		const npmError = new Error( 'npm install failed' );
		( execSync as jest.Mock ).mockImplementation( () => {
			throw npmError;
		} );

		expect( () => runNpmInstall( mockProjectName ) ).toThrow(
			`Could not run "npm install" in "${ mockProjectName }". Error: ${ npmError.message }`
		);
		expect( execSync ).toHaveBeenCalledWith( 'npm install', {
			cwd: mockProjectPath,
			stdio: 'inherit',
		} );
	} );
} );
