import { addTrailingSlash, toInternalUrl } from '@/utils';
import { getConfig } from '@/config';

describe( 'toInternalUrl', () => {
	it( 'should return the original URL if it is not an internal URL', () => {
		const url = 'http://external.com';
		expect( toInternalUrl( url ) ).toBe( url );
	} );

	it( 'should convert a relative internal URL to an absolute URL', () => {
		const url = '/path';
		const { nextUrl } = getConfig();
		expect( toInternalUrl( url ) ).toBe(
			new URL( url, nextUrl ).toString()
		);
	} );

	it( 'should convert an absolute internal URL to the internal URL with the same path, search, hash, username, and password', () => {
		const url = 'https://env-home.example.com/path?query=1#hash';
		const { nextUrl } = getConfig();

		expect( toInternalUrl( url ) ).toBe(
			addTrailingSlash( nextUrl ) + 'path?query=1#hash'
		);
	} );
} );
