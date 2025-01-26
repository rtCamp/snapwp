import isValidUrl from '../is-valid-url';

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
