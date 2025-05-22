import path from 'path';
import { setupEnvFile } from '../setup-env-file';

// Mock 'fs'
// jest.mock( 'fs' ); // Original mock
const mockFs = {
	access: jest.fn(),
	cp: jest.fn(),
	writeFile: jest.fn(),
	stat: jest.fn(),
	rm: jest.fn(),
};
jest.mock( 'fs/promises', () => mockFs ); // Mock fs/promises used by the module

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

describe( 'setupEnvFile', () => {
	const mockProjectName = 'test-env-project';
	const mockProjectDirPath = path.join( process.cwd(), mockProjectName );
	// const mockWordPressUrl = 'https://mywpsite.com'; // No longer directly used in setupEnvFile tests
	const envFilePath = path.join( mockProjectDirPath, '.env' );

	beforeEach( () => {
		// ( fs.writeFileSync as jest.Mock ).mockClear(); // fs.writeFileSync is not used by the module
		Object.values( mockFs ).forEach( ( mockFn ) => mockFn.mockClear() );
		mockFs.access.mockRejectedValue(
			Object.assign( new Error( 'ENOENT' ), { code: 'ENOENT' } )
		); // Default to .env not existing
		mockFs.stat.mockResolvedValue( { size: 100 } ); // Default to .env not empty
	} );

	it( 'should create a .env file using default if useDefaultEnv is true and .env does not exist', async () => {
		await setupEnvFile( mockProjectDirPath, true );

		expect( mockFs.cp ).toHaveBeenCalled(); // Check if fs.cp was called for default .env
		const cpCall = mockFs.cp.mock.calls[ 0 ];
		expect( cpCall[ 0 ] ).toContain(
			'examples/nextjs/starter/.env.example'
		); // Source
		expect( cpCall[ 1 ] ).toBe( envFilePath ); // Destination
		expect( mockFs.writeFile ).not.toHaveBeenCalled(); // Should not call writeFile if copying default
	} );

	it( 'should prompt user if useDefaultEnv is false and .env does not exist', async () => {
		// Mock openEditor and prompt to simulate user interaction
		const mockOpenEditor = jest
			.fn()
			.mockResolvedValue( { success: true, message: 'Editor opened' } );
		const mockPrompt = jest.fn().mockResolvedValue( undefined );
		jest.mock( '../utils/open-editor', () => ( {
			openEditor: mockOpenEditor,
		} ) );
		jest.mock( '../utils/prompt', () => ( {
			prompt: mockPrompt,
		} ) );

		await setupEnvFile( mockProjectDirPath, false );

		expect( mockPrompt ).toHaveBeenCalled();
		expect( mockFs.writeFile ).toHaveBeenCalledWith( envFilePath, '' ); // Empty file created before opening editor
		expect( mockOpenEditor ).toHaveBeenCalledWith( envFilePath );
	} );

	it( 'should throw an error if .env file is empty after prompt', async () => {
		mockFs.stat.mockResolvedValue( { size: 0 } ); // Simulate empty .env file
		// Mock openEditor and prompt to simulate user interaction leading to an empty file
		const mockOpenEditor = jest
			.fn()
			.mockResolvedValue( { success: true, message: 'Editor opened' } );
		const mockPrompt = jest.fn().mockResolvedValue( undefined );
		jest.mock( '../utils/open-editor', () => ( {
			openEditor: mockOpenEditor,
		} ) );
		jest.mock( '../utils/prompt', () => ( {
			prompt: mockPrompt,
		} ) );

		await expect(
			setupEnvFile( mockProjectDirPath, false )
		).rejects.toThrow(
			`An empty ".env" found at "${ envFilePath }". Please try again with a non-empty ".env" file.`
		);
		expect( mockFs.rm ).toHaveBeenCalledWith( envFilePath, {
			force: true,
		} ); // Empty file should be removed
	} );

	it( 'should not attempt to create .env if it already exists and is not empty', async () => {
		mockFs.access.mockResolvedValue( undefined ); // Simulate .env already exists

		await setupEnvFile( mockProjectDirPath, true ); // useDefaultEnv true
		expect( mockFs.cp ).not.toHaveBeenCalled();
		expect( mockFs.writeFile ).not.toHaveBeenCalled();

		await setupEnvFile( mockProjectDirPath, false ); // useDefaultEnv false
		const mockOpenEditor = jest.fn();
		const mockPrompt = jest.fn();
		jest.mock( '../utils/open-editor', () => ( {
			openEditor: mockOpenEditor,
		} ) );
		jest.mock( '../utils/prompt', () => ( {
			prompt: mockPrompt,
		} ) );
		expect( mockPrompt ).not.toHaveBeenCalled();
		expect( mockOpenEditor ).not.toHaveBeenCalled();
	} );

	// Add more tests for other scenarios, like openEditor failing, fs.access throwing other errors etc.
} );
