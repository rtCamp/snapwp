import {
	isWPHomeUrl,
	isWPSiteUrl,
	isInternalUrl,
	isValidUrl,
} from '../validators';

describe( 'URL Validator functions', () => {
	beforeEach( () => {
		jest.resetAllMocks();
	} );

	describe( 'isWPHomeUrl', () => {
		it( 'should return true if the URL is the home URL', () => {
			expect( isWPHomeUrl( 'https://env-home.example.com' ) ).toBe(
				true
			);
		} );

		it( 'should return true if the URL starts with the home URL', () => {
			expect( isWPHomeUrl( 'https://env-home.example.com/path' ) ).toBe(
				true
			);
		} );

		it( 'should return false if the URL starts with a slash', () => {
			expect( isWPHomeUrl( '/path' ) ).toBe( false );
		} );

		it( 'should return false if the URL does not match the home URL', () => {
			expect( isWPHomeUrl( 'https://other.example.com' ) ).toBe( false );
		} );
	} );

	describe( 'isWPSiteUrl', () => {
		it( 'should return true if the URL starts with the site URL', () => {
			expect(
				isWPSiteUrl( 'https://env-home.example.com/wp/path' )
			).toBe( true );
		} );

		it( 'should return false if the URL does not start with the site URL', () => {
			expect( isWPSiteUrl( 'https://other.example.com' ) ).toBe( false );
		} );
	} );

	describe( 'isInternalUrl', () => {
		it( 'should return true if the URL is the home URL', () => {
			expect( isInternalUrl( 'https://env-home.example.com' ) ).toBe(
				true
			);
		} );

		it( 'should return true if the URL starts with the home URL', () => {
			expect( isInternalUrl( 'https://env-home.example.com/path' ) ).toBe(
				true
			);
		} );

		it( 'should return true if the URL starts with the site URL', () => {
			expect(
				isInternalUrl( 'https://env-home.example.com/wp/path' )
			).toBe( true );
		} );

		it( 'should return false if the URL does not match the home or site URL', () => {
			expect( isInternalUrl( 'https://other.example.com' ) ).toBe(
				false
			);
		} );
	} );

	describe( 'isValidUrl', () => {
		it( 'should return true for a valid URL with http', () => {
			const result = isValidUrl( 'http://example.com' );
			expect( result ).toBe( true );
		} );

		it( 'should return true for a valid URL with https', () => {
			const result = isValidUrl( 'https://example.com' );
			expect( result ).toBe( true );
		} );

		it( 'should return true for a valid URL with subdomain', () => {
			const result = isValidUrl( 'https://sub.example.com' );
			expect( result ).toBe( true );
		} );

		it( 'should return true for a valid URL with path', () => {
			const result = isValidUrl( 'https://example.com/path' );
			expect( result ).toBe( true );
		} );

		it( 'should return true for a valid URL with query parameters', () => {
			const result = isValidUrl( 'https://example.com/path?name=value' );
			expect( result ).toBe( true );
		} );

		it( 'should return true for a valid URL with fragment', () => {
			const result = isValidUrl( 'https://example.com/path#section' );
			expect( result ).toBe( true );
		} );

		it( 'should return false for an invalid URL without protocol', () => {
			const result = isValidUrl( 'example.com' );
			expect( result ).toBe( false );
		} );

		it( 'should return false for an invalid URL with spaces', () => {
			const result = isValidUrl( 'https:// example .com' );
			expect( result ).toBe( false );
		} );

		it( 'should return false for an invalid URL with special characters', () => {
			const result = isValidUrl( 'https://exa mple.com' );
			expect( result ).toBe( false );
		} );

		it( 'should return false for an empty string', () => {
			const result = isValidUrl( '' );
			expect( result ).toBe( false );
		} );

		it( 'should return false for a non-string input', () => {
			const result = isValidUrl( 123 as unknown as string );
			expect( result ).toBe( false );
		} );
	} );
} );
