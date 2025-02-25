/* eslint-disable no-console, n/no-process-env -- Allow the use of console & process.env. */
import { Logger } from '../index';

describe( 'Logger', () => {
	beforeEach( () => {
		jest.spyOn( console, 'debug' ).mockImplementation( () => {} );
		jest.spyOn( console, 'info' ).mockImplementation( () => {} );
		jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
		jest.spyOn( console, 'error' ).mockImplementation( () => {} );
		jest.spyOn( console, 'log' ).mockImplementation( () => {} );
	} );

	afterEach( () => {
		jest.restoreAllMocks();
	} );

	it( 'should log a debug message', () => {
		process.env.NODE_ENV = 'dev';
		Logger.debug( 'Debug message' );
		expect( console.debug ).toHaveBeenCalledWith(
			'SnapWP:',
			'Debug message'
		);
	} );

	it( 'should log an info message', () => {
		process.env.NODE_ENV = 'dev';
		Logger.info( 'Info message' );
		expect( console.info ).toHaveBeenCalledWith(
			'SnapWP:',
			'Info message'
		);
	} );

	it( 'should log a warning message', () => {
		process.env.NODE_ENV = 'dev';
		Logger.warn( 'Warning message' );
		expect( console.warn ).toHaveBeenCalledWith(
			'SnapWP:',
			'Warning message'
		);
	} );

	it( 'should log an error message', () => {
		process.env.NODE_ENV = 'dev';
		Logger.error( 'Error message' );
		expect( console.error ).toHaveBeenCalledWith(
			'SnapWP:',
			'Error message'
		);
	} );

	it( 'should log a general message', () => {
		process.env.NODE_ENV = 'dev';
		Logger.log( 'General message' );
		expect( console.log ).toHaveBeenCalledWith(
			'SnapWP:',
			'General message'
		);
	} );

	it( 'should not log in production mode', () => {
		process.env.NODE_ENV = 'production';
		Logger.debug( 'Debug message' );
		Logger.info( 'Info message' );
		Logger.warn( 'Warning message' );
		Logger.error( 'Error message' );
		Logger.log( 'General message' );
		expect( console.debug ).not.toHaveBeenCalled();
		expect( console.info ).not.toHaveBeenCalled();
		expect( console.warn ).not.toHaveBeenCalled();
		expect( console.error ).not.toHaveBeenCalled();
		expect( console.log ).not.toHaveBeenCalled();
		process.env.NODE_ENV = 'test';
	} );

	it( 'should not log in test mode', () => {
		Logger.debug( 'Debug message' );
		Logger.info( 'Info message' );
		Logger.warn( 'Warning message' );
		Logger.error( 'Error message' );
		Logger.log( 'General message' );
		expect( console.debug ).not.toHaveBeenCalled();
		expect( console.info ).not.toHaveBeenCalled();
		expect( console.warn ).not.toHaveBeenCalled();
		expect( console.error ).not.toHaveBeenCalled();
		expect( console.log ).not.toHaveBeenCalled();
	} );
} );

/* eslint-enable no-console, n/no-process-env -- Disallow the use of console & process.env. */
