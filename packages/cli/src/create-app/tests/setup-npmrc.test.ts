import path from 'path';
import { setupNpmrc } from '../setup-npmrc';

// Mock 'fs/promises'
const mockFs = {
	writeFile: jest.fn(),
};
jest.mock( 'fs/promises', () => mockFs );

// Mock 'ora' - Assuming ora might be used indirectly or for consistency, keep if needed, otherwise remove.
// If not used by setupNpmrc or its direct utils, this mock can be removed.
jest.mock( 'ora', () => {
	const mockOraInstance = {
		start: jest.fn().mockReturnThis(),
		succeed: jest.fn().mockReturnThis(),
		fail: jest.fn().mockReturnThis(),
		stop: jest.fn().mockReturnThis(),
	};
	return jest.fn( () => mockOraInstance );
} );

// Mock console.log to verify output messages
const mockConsoleLog = jest
	.spyOn( console, 'log' )
	.mockImplementation( () => {} );

describe( 'setupNpmrc', () => {
	const mockProjectName = 'test-npmrc-project'; // projectDirPath is used, projectName is for context
	const mockProjectDirPath = path.join( process.cwd(), mockProjectName );
	const npmrcFilePath = path.join( mockProjectDirPath, '.npmrc' );
	const expectedNpmrcContent = '@snapwp:registry=http://localhost:4873';

	beforeEach( () => {
		mockFs.writeFile.mockClear();
		mockConsoleLog.mockClear();
	} );

	afterAll( () => {
		mockConsoleLog.mockRestore();
	} );

	it( 'should create .npmrc with proxy config if useProxy is true', async () => {
		await setupNpmrc( mockProjectDirPath, true );

		expect( mockFs.writeFile ).toHaveBeenCalledWith(
			npmrcFilePath,
			expectedNpmrcContent
		);
		expect( mockConsoleLog ).toHaveBeenCalledWith(
			'Found --proxy flag, generating `.npmrc` file.'
		);
		expect( mockConsoleLog ).toHaveBeenCalledWith(
			'`.npmrc` file generated successfully. Please make sure the proxy registry is running on http://localhost:4873'
		);
	} );

	it( 'should NOT create .npmrc if useProxy is false', async () => {
		await setupNpmrc( mockProjectDirPath, false );

		expect( mockFs.writeFile ).not.toHaveBeenCalled();
		expect( mockConsoleLog ).not.toHaveBeenCalled();
	} );

	it( 'should throw an error if writing .npmrc fails when useProxy is true', async () => {
		const writeError = new Error( 'Failed to write .npmrc' );
		mockFs.writeFile.mockRejectedValue( writeError );

		await expect( setupNpmrc( mockProjectDirPath, true ) ).rejects.toThrow(
			writeError
		);
		expect( mockConsoleLog ).toHaveBeenCalledWith(
			'Found --proxy flag, generating `.npmrc` file.'
		); // Log before writeFile
		// The second log about success should not be called if writeFile fails
		expect( mockConsoleLog ).not.toHaveBeenCalledWith(
			expect.stringContaining( 'generated successfully' )
		);
	} );
} );
