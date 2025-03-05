import { addTrailingSlash, toFrontendUri } from '@/utils';
import { getConfig } from '@/config';

describe( 'toFrontendUri', () => {
	it( 'should return the original URL if it is not an internal URL', () => {
		const url = 'http://external.com';
		expect( toFrontendUri( url ) ).toBe( url );
	} );

	it( 'should convert a relative internal URL to an absolute URL', () => {
		const url = '/path';
		const { nextUrl } = getConfig();
		expect( toFrontendUri( url ) ).toBe(
			new URL( url, nextUrl ).toString()
		);
	} );

	it( 'should convert an absolute internal URL to the internal URL with the same path, search, hash, username, and password', () => {
		const url = 'https://env-home.example.com/path?query=1#hash';
		const { nextUrl } = getConfig();

		expect( toFrontendUri( url ) ).toBe(
			addTrailingSlash( nextUrl ) + 'path?query=1#hash'
		);
	} );
} );
