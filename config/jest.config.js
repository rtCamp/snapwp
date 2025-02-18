import { pathsToModuleNameMapper } from 'ts-jest';
import blocksConfig from '../packages/blocks/tsconfig.json' with { type: 'json' };
import coreConfig from '../packages/core/tsconfig.json' with { type: 'json' };
import queryConfig from '../packages/query/tsconfig.json' with { type: 'json' };
import nextConfig from '../packages/next/tsconfig.json' with { type: 'json' };

const snapWPModuleNameMapper = {
	'^@snapwp/([^/]+)/(.*)$': '<rootDir>/packages/$1/dist/$2',
	'^@snapwp/([^/]+)$': '<rootDir>/packages/$1/dist',
};

// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('jest').Config} */
const config = {
	rootDir: '../',
	coverageReporters: [ 'lcov' ],
	projects: [
		{
			displayName: '@snapwp/core tests',
			rootDir: './',
			testMatch: [ '<rootDir>/packages/core/src/**/*.test.{ts,tsx}' ],
			testPathIgnorePatterns: [ '<rootDir>/packages/core/dist' ],
			setupFiles: [ '<rootDir>/packages/core/jest.setup.js' ],
			moduleNameMapper: {
				...pathsToModuleNameMapper( coreConfig.compilerOptions.paths, {
					prefix: '<rootDir>/packages/core/',
				} ),
				...snapWPModuleNameMapper,
			},
			transform: {
				'^.+\\.jsx?$': [
					'babel-jest',
					{
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
					},
				],
				'^.+.tsx?$': [
					'ts-jest',
					{
						useESM: true,
						isolatedModules: true,
						tsconfig: '<rootDir>/packages/core/tsconfig.json',
					},
				],
			},
			collectCoverageFrom: [
				'<rootDir>/packages/core/src/**/*.{ts,tsx}',
			],
			coveragePathIgnorePatterns: [ '<rootDir>/packages/core/dist/' ],
		},
		{
			displayName: '@snapwp/query tests',
			rootDir: './',
			testMatch: [ '<rootDir>/packages/query/src/**/*.test.{ts,tsx}' ],
			testPathIgnorePatterns: [ '<rootDir>/packages/query/dist' ],
			moduleNameMapper: {
				...pathsToModuleNameMapper( queryConfig.compilerOptions.paths, {
					prefix: '<rootDir>/packages/query/',
				} ),
				...snapWPModuleNameMapper,
			},
			transform: {
				'^.+\\.jsx?$': [
					'babel-jest',
					{
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
					},
				],
				'^.+.tsx?$': [
					'ts-jest',
					{
						useESM: true,
						isolatedModules: true,
						tsconfig: '<rootDir>/packages/query/tsconfig.json',
					},
				],
			},
			collectCoverageFrom: [
				'<rootDir>/packages/query/src/**/*.{ts,tsx}',
			],
			coveragePathIgnorePatterns: [ '<rootDir>/packages/query/dist/' ],
		},
		{
			displayName: '@snapwp/next tests',
			rootDir: './',
			testMatch: [ '<rootDir>/packages/next/src/**/*.test.{ts,tsx}' ],
			testPathIgnorePatterns: [ '<rootDir>/packages/next/dist' ],
			moduleNameMapper: {
				...pathsToModuleNameMapper( nextConfig.compilerOptions.paths, {
					prefix: '<rootDir>/packages/next/',
				} ),
				...snapWPModuleNameMapper,
			},
			transform: {
				'^.+\\.jsx?$': [
					'babel-jest',
					{
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
					},
				],
				'^.+.tsx?$': [
					'ts-jest',
					{
						useESM: true,
						isolatedModules: true,
						tsconfig: '<rootDir>/packages/next/tsconfig.json',
					},
				],
			},
			collectCoverageFrom: [
				'<rootDir>/packages/next/src/**/*.{ts,tsx}',
			],
			coveragePathIgnorePatterns: [ '<rootDir>/packages/next/dist/' ],
		},
		{
			displayName: '@snapwp/blocks tests',
			rootDir: './',
			testMatch: [ '<rootDir>/packages/blocks/src/**/*.test.{ts,tsx}' ],
			testPathIgnorePatterns: [ '<rootDir>/packages/blocks/dist' ],
			moduleNameMapper: {
				...pathsToModuleNameMapper(
					blocksConfig.compilerOptions.paths,
					{
						prefix: '<rootDir>/packages/blocks/',
					}
				),
				...snapWPModuleNameMapper,
			},
			setupFiles: [ '<rootDir>/packages/blocks/jest.setup.js' ],
			testEnvironment: 'jest-environment-jsdom',
			transform: {
				'^.+\\.jsx?$': [
					'babel-jest',
					{
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
					},
				],
				'^.+.tsx?$': [
					'ts-jest',
					{
						useESM: true,
						isolatedModules: true,
						tsconfig: '<rootDir>/packages/blocks/tsconfig.json',
					},
				],
			},
			collectCoverageFrom: [
				'<rootDir>/packages/blocks/src/**/*.{ts,tsx}',
			],
			coveragePathIgnorePatterns: [ '<rootDir>/packages/blocks/dist/' ],
		},
	],
};

export default config;
