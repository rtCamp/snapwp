import { isWPHomeUrl, isWPSiteUrl, isInternalUrl } from '@/utils/url-checker';

describe( 'URL Checker Functions', () => {
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

		it( 'should return true if the URL starts with a slash', () => {
			expect( isWPHomeUrl( '/path' ) ).toBe( true );
		} );

		it( 'should return false if the URL does not match the home URL', () => {
			expect( isWPHomeUrl( 'https://other.example.com' ) ).toBe( false );
		} );
	} );

	describe( 'isWPSiteUrl', () => {
		it( 'should return true if the URL starts with the site URL', () => {
			expect( isWPSiteUrl( 'https://env-home.example.com/path' ) ).toBe(
				true
			);
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
			expect( isInternalUrl( 'https://env-home.example.com/path' ) ).toBe(
				true
			);
		} );

		it( 'should return false if the URL does not match the home or site URL', () => {
			expect( isInternalUrl( 'https://other.example.com' ) ).toBe(
				false
			);
		} );
	} );
} );
