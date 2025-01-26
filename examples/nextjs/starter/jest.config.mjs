import nextJest from 'next/jest.js';

const createJestConfig = nextJest( {
	dir: './',
} );

const config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: [ '<rootDir>/jest.setup.js' ],
};

export default createJestConfig( config );
