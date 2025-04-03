import {
	removeTrailingSlash,
	addTrailingSlash,
	removeLeadingSlash,
	addLeadingSlash,
	toFrontendUri,
} from '../transformers';

describe( 'URL Transformer functions', () => {
	describe( 'removeTrailingSlash', () => {
		it( 'should remove trailing slash from the URL', () => {
			expect( removeTrailingSlash( 'https://example.com/' ) ).toBe(
				'https://example.com'
			);
			expect( removeTrailingSlash( 'https://example.com/path/' ) ).toBe(
				'https://example.com/path'
			);
		} );

		it( 'should return the same URL if there is no trailing slash', () => {
			expect( removeTrailingSlash( 'https://example.com' ) ).toBe(
				'https://example.com'
			);
			expect( removeTrailingSlash( 'https://example.com/path' ) ).toBe(
				'https://example.com/path'
			);
		} );
	} );

	describe( 'addTrailingSlash', () => {
		it( 'should add trailing slash to the URL', () => {
			expect( addTrailingSlash( 'https://example.com' ) ).toBe(
				'https://example.com/'
			);
			expect( addTrailingSlash( 'https://example.com/path' ) ).toBe(
				'https://example.com/path/'
			);
		} );

		it( 'should return the same URL if there is already a trailing slash', () => {
			expect( addTrailingSlash( 'https://example.com/' ) ).toBe(
				'https://example.com/'
			);
			expect( addTrailingSlash( 'https://example.com/path/' ) ).toBe(
				'https://example.com/path/'
			);
		} );
	} );

	describe( 'removeLeadingSlash', () => {
		it( 'should remove leading slash from the URL', () => {
			expect( removeLeadingSlash( '/path' ) ).toBe( 'path' );
			expect( removeLeadingSlash( '/path/to/resource' ) ).toBe(
				'path/to/resource'
			);
		} );

		it( 'should return the same URL if there is no leading slash', () => {
			expect( removeLeadingSlash( 'path' ) ).toBe( 'path' );
			expect( removeLeadingSlash( 'path/to/resource' ) ).toBe(
				'path/to/resource'
			);
		} );
	} );

	describe( 'addLeadingSlash', () => {
		it( 'should add leading slash to the URL', () => {
			expect( addLeadingSlash( 'path' ) ).toBe( '/path' );
			expect( addLeadingSlash( 'path/to/resource' ) ).toBe(
				'/path/to/resource'
			);
		} );

		it( 'should return the same URL if there is already a leading slash', () => {
			expect( addLeadingSlash( '/path' ) ).toBe( '/path' );
			expect( addLeadingSlash( '/path/to/resource' ) ).toBe(
				'/path/to/resource'
			);
		} );
	} );

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
} );
