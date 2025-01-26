import {
	removeTrailingSlash,
	addTrailingSlash,
	removeLeadingSlash,
	addLeadingSlash,
} from '../url-slash-modify';

describe( 'URL Slash Modify Functions', () => {
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
} );
