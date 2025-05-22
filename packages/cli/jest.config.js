import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' assert { type: 'json' };

// Module mapper for other @snapwp packages in the monorepo
// Assumes that from 'packages/cli', other packages are one level up in 'packages/'
const snapWPModuleNameMapperForCli = {
	'^@snapwp/([^/]+)/(.*)$': '<rootDir>/../$1/dist/$2', // For specific file imports, e.g., @snapwp/core/utils
	'^@snapwp/([^/]+)$': '<rootDir>/../$1/dist', // For base package imports, e.g., @snapwp/core
};

/** @type {import('jest').Config} */
export const config = {
	// Changed to named export
	preset: 'ts-jest/presets/default-esm', // ESM preset for ts-jest
	testEnvironment: 'node',
	rootDir: '.', // Sets the root directory to the current package (packages/cli)

	moduleNameMapper: {
		// Converts tsconfig.json paths (e.g., "@/*") for Jest
		// The 'prefix' should align with tsconfig.compilerOptions.baseUrl
		// Here, baseUrl is '.', so prefix is '<rootDir>/'
		...pathsToModuleNameMapper( tsconfig.compilerOptions.paths || {}, {
			prefix: '<rootDir>/',
			useESM: true, // Crucial for ESM path mapping
		} ),
		// Adds mappings for other @snapwp packages
		...snapWPModuleNameMapperForCli,
	},

	// Customize the transform for .ts files if needed (e.g., specific ts-jest options)
	// The 'ts-jest/presets/default-esm' preset already configures a transform,
	// but overriding allows for specifying 'isolatedModules' and 'tsconfig'.
	transform: {
		'^.+\\.ts$': [
			// Match only .ts files (assuming no .tsx in the CLI package)
			'ts-jest',
			{
				useESM: true, // Ensure ts-jest processes files as ES modules
				isolatedModules: true, // Speeds up TypeScript transpilation by skipping type checking
				tsconfig: '<rootDir>/tsconfig.json', // Explicitly point to the package's tsconfig
			},
		],
	},

	// Specifies the pattern Jest uses to detect test files
	testMatch: [
		'<rootDir>/src/**/*.test.ts', // Looks for .test.ts files under the src directory
	],
};
