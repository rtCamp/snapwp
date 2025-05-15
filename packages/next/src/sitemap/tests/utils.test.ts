import { getConfig } from '@snapwp/core/config';

// Mock dependencies
jest.mock( '../services', () => ( {
	fetchIndexSitemap: jest.fn(),
	fetchSubSitemap: jest.fn(),
} ) );

jest.mock( '../utils', () => ( {
	parseSitemap: jest.fn(),
	shouldIgnoreSitemapPath: jest.fn(),
} ) );

jest.mock( '@snapwp/core/config', () => ( {
	getConfig: jest.fn(),
} ) );

// Add tests for shouldIgnoreSitemapPath function
describe( 'shouldIgnoreSitemapPath', () => {
	// Import the actual function for tests
	const { shouldIgnoreSitemapPath: actualShouldIgnoreSitemapPath } =
		jest.requireActual( '../utils' );

	it( 'should return false when no ignore patterns are configured', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );
		const result = actualShouldIgnoreSitemapPath(
			'https://example.com/some-path'
		);
		expect( result ).toBe( false );
	} );

	it( 'should return false when sitemap config is undefined', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );

		const result = actualShouldIgnoreSitemapPath(
			'https://example.com/some-path'
		);
		expect( result ).toBe( false );
	} );

	it( 'should return false when path does not match any pattern', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
			sitemap: {
				ignorePatterns: [ '/admin/', '/wp-admin/' ],
			},
		} );

		const result = actualShouldIgnoreSitemapPath(
			'https://example.com/some-path'
		);
		expect( result ).toBe( false );
	} );

	it( 'should return true when path matches an ignore pattern', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
			sitemap: {
				ignorePatterns: [
					'/admin/',
					'/wp-admin/',
					'example\\.com\\/some',
				],
			},
		} );

		const result = actualShouldIgnoreSitemapPath(
			'https://example.com/some-path'
		);
		expect( result ).toBe( true );
	} );
} );

// Add tests for parseSitemap function
describe( 'parseSitemap', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	// Import the actual function for tests
	const { parseSitemap: actualParseSitemap } =
		jest.requireActual( '../utils' );

	it( 'should return undefined when loc is not provided', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );

		const result = actualParseSitemap( {
			lastmod: '2023-01-01',
			priority: 0.8,
			changeFrequency: 'weekly',
		} );

		expect( result ).toBeUndefined();
	} );

	it( 'should return undefined when the path should be ignored', () => {
		// Mock getConfig to return ignorePatterns that match our test URL
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
			sitemap: {
				ignorePatterns: [ 'ignored-path' ],
			},
		} );

		// Call parseSitemap with a URL that matches our ignore pattern
		const result = actualParseSitemap( {
			loc: 'https://example.com/ignored-path',
			lastmod: '2023-01-01',
		} );

		expect( result ).toBeUndefined();
	} );

	it( 'should convert lastmod string to Date object', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );
		const lastmod = '2023-01-01';
		const result = actualParseSitemap( {
			loc: 'https://example.com/path',
			lastmod,
		} );

		expect( result ).toEqual( {
			url: 'https://example.com/path',
			lastModified: new Date( lastmod ),
		} );
	} );

	it( 'should include changeFrequency when provided', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );

		const result = actualParseSitemap( {
			loc: 'https://example.com/path',
			changeFrequency: 'weekly',
		} );

		expect( result ).toEqual( {
			url: 'https://example.com/path',
			changeFrequency: 'weekly',
		} );
	} );

	it( 'should include priority when provided', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );
		const result = actualParseSitemap( {
			loc: 'https://example.com/path',
			priority: 0.8,
		} );

		expect( result ).toEqual( {
			url: 'https://example.com/path',
			priority: 0.8,
		} );
	} );

	it( 'should include all properties when provided', () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );
		const lastmod = '2023-01-01';
		const result = actualParseSitemap( {
			loc: 'https://example.com/path',
			lastmod,
			changeFrequency: 'weekly',
			priority: 0.8,
		} );

		expect( result ).toEqual( {
			url: 'https://example.com/path',
			lastModified: new Date( lastmod ),
			changeFrequency: 'weekly',
			priority: 0.8,
		} );
	} );
} );
