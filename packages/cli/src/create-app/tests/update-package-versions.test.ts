import fs from 'fs';
import path from 'path';
import { updatePackageVersions } from '../update-package-versions';

// Mock 'fs'
jest.mock( 'fs' );
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

// Mock the CLI's package.json path and content
// path.resolve(__dirname, '../../../../package.json')
const mockCliPackageJsonPath = path.resolve(
	__dirname,
	'../../../../package.json'
);

describe( 'updatePackageVersions', () => {
	const mockProjectName = 'test-update-versions-project';
	const mockProjectPath = path.join( process.cwd(), mockProjectName );
	const projectPackageJsonPath = path.join( mockProjectPath, 'package.json' );
	const mockCliVersion = '0.5.0'; // Example CLI version

	const cliPackageJsonContent = {
		name: 'snapwp',
		version: mockCliVersion,
		dependencies: {},
		devDependencies: {},
	};

	beforeEach( () => {
		( fs.readFileSync as jest.Mock ).mockClear();
		( fs.writeFileSync as jest.Mock ).mockClear();

		// Mock readFileSync to return the CLI's package.json when its path is requested
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			// For the project's package.json, specific tests will provide their own mock below
			return JSON.stringify( {} ); // Default empty project package.json
		} );
	} );

	it( 'should update @snapwp/* package versions in dependencies', () => {
		const projectPackageJson = {
			name: mockProjectName,
			version: '1.0.0',
			dependencies: {
				'@snapwp/core': '^0.1.0',
				'some-other-package': '1.2.3',
				'@snapwp/utils': '0.2.0',
			},
			devDependencies: {
				'@snapwp/eslint-config': '0.1.5',
			},
		};
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === projectPackageJsonPath ) {
				return JSON.stringify( projectPackageJson );
			}
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			return '';
		} );

		updatePackageVersions( mockProjectName );

		const expectedProjectPackageJson = {
			...projectPackageJson,
			dependencies: {
				'@snapwp/core': `^${ mockCliVersion }`,
				'some-other-package': '1.2.3',
				'@snapwp/utils': `^${ mockCliVersion }`,
			},
			devDependencies: {
				'@snapwp/eslint-config': `^${ mockCliVersion }`,
			},
		};

		expect( fs.writeFileSync ).toHaveBeenCalledWith(
			projectPackageJsonPath,
			JSON.stringify( expectedProjectPackageJson, null, 2 )
		);
	} );

	it( 'should add carets to versions that do not have them', () => {
		const projectPackageJson = {
			name: mockProjectName,
			version: '1.0.0',
			dependencies: {
				'@snapwp/core': '0.1.0', // No caret
			},
		};
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === projectPackageJsonPath ) {
				return JSON.stringify( projectPackageJson );
			}
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			return '';
		} );
		updatePackageVersions( mockProjectName );
		const writtenContent = JSON.parse(
			( fs.writeFileSync as jest.Mock ).mock.calls[ 0 ][ 1 ]
		);
		expect( writtenContent.dependencies[ '@snapwp/core' ] ).toBe(
			`^${ mockCliVersion }`
		);
	} );

	it( 'should handle missing dependencies or devDependencies sections', () => {
		const projectPackageJson = {
			name: mockProjectName,
			version: '1.0.0',
			// No dependencies or devDependencies
		};
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === projectPackageJsonPath ) {
				return JSON.stringify( projectPackageJson );
			}
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			return '';
		} );

		updatePackageVersions( mockProjectName );

		// Expect writeFileSync to be called, even if no changes were made,
		// as the function currently reads then writes.
		// The content should be the same as what was read if no @snapwp packages.
		expect( fs.writeFileSync ).toHaveBeenCalledWith(
			projectPackageJsonPath,
			JSON.stringify( projectPackageJson, null, 2 )
		);
	} );

	it( 'should not modify non-@snapwp packages', () => {
		const projectPackageJson = {
			name: mockProjectName,
			version: '1.0.0',
			dependencies: {
				react: '18.0.0',
				'@types/react': '18.0.0',
			},
		};
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === projectPackageJsonPath ) {
				return JSON.stringify( projectPackageJson );
			}
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			return '';
		} );

		updatePackageVersions( mockProjectName );
		expect( fs.writeFileSync ).toHaveBeenCalledWith(
			projectPackageJsonPath,
			JSON.stringify( projectPackageJson, null, 2 ) // Content should be unchanged
		);
	} );

	it( 'should throw an error if reading project package.json fails', () => {
		const readError = new Error( 'Failed to read project package.json' );
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === projectPackageJsonPath ) {
				throw readError;
			}
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			return '';
		} );

		expect( () => updatePackageVersions( mockProjectName ) ).toThrow(
			`Could not update package versions in "${ mockProjectName }". Error: ${ readError.message }`
		);
	} );

	it( 'should throw an error if writing project package.json fails', () => {
		const projectPackageJson = {
			name: 'test',
			version: '1.0.0',
			dependencies: { '@snapwp/core': '0.1.0' },
		};
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === projectPackageJsonPath ) {
				return JSON.stringify( projectPackageJson );
			}
			if ( filePath === mockCliPackageJsonPath ) {
				return JSON.stringify( cliPackageJsonContent );
			}
			return '';
		} );

		const writeError = new Error( 'Failed to write project package.json' );
		( fs.writeFileSync as jest.Mock ).mockImplementation( () => {
			throw writeError;
		} );

		expect( () => updatePackageVersions( mockProjectName ) ).toThrow(
			`Could not update package versions in "${ mockProjectName }". Error: ${ writeError.message }`
		);
	} );

	it( 'should throw an error if reading CLI package.json fails', () => {
		const readCliError = new Error( 'Failed to read CLI package.json' );
		( fs.readFileSync as jest.Mock ).mockImplementation( ( filePath ) => {
			if ( filePath === mockCliPackageJsonPath ) {
				throw readCliError;
			}
			// This case should be hit first by the logic in updatePackageVersions
			return JSON.stringify( {} );
		} );

		expect( () => updatePackageVersions( mockProjectName ) ).toThrow(
			`Could not update package versions in "${ mockProjectName }". Error: ${ readCliError.message }`
		);
	} );
} );
