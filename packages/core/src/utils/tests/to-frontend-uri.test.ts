import { toFrontendUri } from '@/utils';

describe( 'toFrontendUri', () => {
	beforeEach( () => {
		jest.resetAllMocks();
	} );

	it( 'should return the original URL if it is not an internal URL', () => {
		const url = 'http://external.com';
		expect( toFrontendUri( url ) ).toBe( url );
	} );

	it( 'should return url as it is if it starts with /', () => {
		const url = '/path';
		expect( toFrontendUri( url ) ).toBe( '/path' );
	} );

	it( 'should convert an absolute internal URL to the internal URL with the same path, search, hash, username, and password', () => {
		const url = 'https://env-home.example.com/path?query=1#hash';
		expect( toFrontendUri( url ) ).toBe( '/path?query=1#hash' );
	} );

	it( 'should handle http vs https when ignoreProtocol is true', () => {
		const url = 'http://env-home.example.com/path';
		expect( toFrontendUri( url ) ).toBe( '/path' );
	} );

	it( 'should handle http vs https when ignoreProtocol is false', () => {
		const url = 'http://env-home.example.com/path';
		expect( toFrontendUri( url ) ).toBe( '/path' );
	} );
} );
