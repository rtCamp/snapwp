import { toFrontendUri } from '@/utils';

describe( 'toFrontendUri', () => {
	it( 'should return the original URL if it is not an internal URL', () => {
		const url = 'http://external.com';
		expect( toFrontendUri( url ) ).toBe( url );
	} );

	it( 'should convert a relative internal URL to an absolute URL', () => {
		const url = '/path';
		expect( toFrontendUri( url ) ).toBe( '/path' );
	} );

	it( 'should convert an absolute internal URL to the internal URL with the same path, search, hash, username, and password', () => {
		const url = 'https://env-home.example.com/path?query=1#hash';

		expect( toFrontendUri( url ) ).toBe( '/path?query=1#hash' );
	} );
} );
