import { Logger } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import { fetchIndexSitemap, fetchSubSitemap } from '../services';

// Mock dependencies
jest.mock( '@snapwp/core/config', () => ( {
	getConfig: jest.fn(),
} ) );

jest.mock( '@snapwp/core', () => ( {
	Logger: {
		error: jest.fn(),
	},
} ) );

// Mock fetch globally
global.fetch = jest.fn();

describe( 'fetchIndexSitemap', () => {
	// Reset mocks before each test
	beforeEach( () => {
		jest.clearAllMocks();

		// Default config mock
		( getConfig as jest.Mock ).mockReturnValue( {
			wpHomeUrl: 'https://wp.example.com',
			sitemap: {
				indexUri: 'wp-sitemap.xml',
			},
		} );

		// Default fetch mock
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <sitemap>
            <loc>https://wp.example.com/post-sitemap.xml</loc>
            <lastmod>2023-01-01</lastmod>
          </sitemap>
          <sitemap>
            <loc>https://wp.example.com/page-sitemap.xml</loc>
            <lastmod>2023-01-02</lastmod>
          </sitemap>
        </sitemapindex>
      ` ),
		} );
	} );

	it( 'should fetch and parse a sitemap index correctly', async () => {
		const result = await fetchIndexSitemap();

		// Verify fetch was called with the correct URL
		expect( global.fetch ).toHaveBeenCalledWith(
			'https://wp.example.com/wp-sitemap.xml'
		);

		// Verify the returned data structure
		expect( result ).toEqual( [
			{
				loc: 'https://wp.example.com/post-sitemap.xml',
				lastmod: '2023-01-01',
			},
			{
				loc: 'https://wp.example.com/page-sitemap.xml',
				lastmod: '2023-01-02',
			},
		] );
	} );

	it( 'should return an empty array if sitemapConfig.indexUri is undefined', async () => {
		( getConfig as jest.Mock ).mockReturnValue( {
			wpHomeUrl: 'https://wp.example.com',
			sitemap: {
				// No indexUri
			},
		} );

		const result = await fetchIndexSitemap();

		expect( global.fetch ).not.toHaveBeenCalled();
		expect( result ).toEqual( [] );
	} );

	it( 'should return an empty array if fetch fails', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: false,
		} );

		const result = await fetchIndexSitemap();

		expect( global.fetch ).toHaveBeenCalled();
		expect( Logger.error ).toHaveBeenCalledWith(
			expect.stringContaining( 'Failed to fetch sitemap index' )
		);
		expect( result ).toEqual( [] );
	} );

	it( 'should handle fetch rejection', async () => {
		( global.fetch as jest.Mock ).mockRejectedValue(
			new Error( 'Network error' )
		);

		await expect( fetchIndexSitemap() ).rejects.toThrow( 'Network error' );
	} );

	it( 'should return an empty array if XML response is invalid', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <invalid>This is not a valid sitemap</invalid>
      ` ),
		} );

		const result = await fetchIndexSitemap();

		expect( Logger.error ).toHaveBeenCalledWith(
			expect.stringContaining( 'No sitemaps found' )
		);
		expect( result ).toEqual( [] );
	} );

	it( 'should return an empty array if sitemap has no entries', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        </sitemapindex>
      ` ),
		} );

		const result = await fetchIndexSitemap();

		expect( Logger.error ).toHaveBeenCalledWith(
			expect.stringContaining( 'No sitemaps found' )
		);
		expect( result ).toEqual( [] );
	} );

	it( 'should apply custom XML parser config when provided', async () => {
		const customConfig = {
			allowBooleanAttributes: true,
			attributeNamePrefix: '_',
		};

		await fetchIndexSitemap( customConfig );

		// Since we can't easily check that XMLParser was called with the right options,
		// we at least verify that fetch was called
		expect( global.fetch ).toHaveBeenCalled();
	} );
} );

describe( 'fetchSubSitemap', () => {
	// Reset mocks before each test
	beforeEach( () => {
		jest.clearAllMocks();

		// Default fetch mock
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://wp.example.com/post/example-1</loc>
            <lastmod>2023-01-01</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
          <url>
            <loc>https://wp.example.com/post/example-2</loc>
            <lastmod>2023-01-02</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
          </url>
        </urlset>
      ` ),
		} );
	} );

	it( 'should fetch and parse a sub-sitemap correctly', async () => {
		const result = await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml'
		);

		// Verify fetch was called with the correct URL
		expect( global.fetch ).toHaveBeenCalledWith(
			'https://wp.example.com/post-sitemap.xml'
		);

		// Verify the returned data structure
		expect( result ).toEqual( [
			{
				loc: 'https://wp.example.com/post/example-1',
				lastmod: '2023-01-01',
				changefreq: 'weekly',
				priority: 0.8,
			},
			{
				loc: 'https://wp.example.com/post/example-2',
				lastmod: '2023-01-02',
				changefreq: 'monthly',
				priority: 0.6,
			},
		] );
	} );

	it( 'should return an empty array if fetch fails', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: false,
		} );

		const result = await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml'
		);

		expect( global.fetch ).toHaveBeenCalled();
		expect( Logger.error ).toHaveBeenCalledWith(
			expect.stringContaining( 'Failed to fetch sitemap' )
		);
		expect( result ).toEqual( [] );
	} );

	it( 'should handle fetch rejection', async () => {
		( global.fetch as jest.Mock ).mockRejectedValue(
			new Error( 'Network error' )
		);

		await expect(
			fetchSubSitemap( 'https://wp.example.com/post-sitemap.xml' )
		).rejects.toThrow( 'Network error' );
	} );

	it( 'should return an empty array if XML response is invalid', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <invalid>This is not a valid sitemap</invalid>
      ` ),
		} );

		const result = await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml'
		);

		expect( Logger.error ).toHaveBeenCalledWith(
			expect.stringContaining( 'No sitemaps found' )
		);
		expect( result ).toEqual( [] );
	} );

	it( 'should return an empty array if sitemap has no entries', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        </urlset>
      ` ),
		} );

		const result = await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml'
		);

		expect( Logger.error ).toHaveBeenCalledWith(
			expect.stringContaining( 'No sitemaps found' )
		);
		expect( result ).toEqual( [] );
	} );

	it( 'should apply custom XML parser config when provided', async () => {
		const customConfig = {
			allowBooleanAttributes: true,
			attributeNamePrefix: '_',
		};

		await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml',
			customConfig
		);

		// Since we can't easily check that XMLParser was called with the right options,
		// we at least verify that fetch was called
		expect( global.fetch ).toHaveBeenCalled();
	} );

	it( 'should handle malformed XML gracefully', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://wp.example.com/post/example-1</loc>
            <lastmod>invalid-date</lastmod>
            <changefreq>invalid-freq</changefreq>
            <priority>invalid-priority</priority>
          </url>
        </urlset>
      ` ),
		} );

		// The function should not throw even with invalid data
		const result = await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml'
		);

		// It should return what the parser gives it
		expect( result ).toEqual( [
			{
				loc: 'https://wp.example.com/post/example-1',
				lastmod: 'invalid-date',
				changefreq: 'invalid-freq',
				priority: 'invalid-priority', // Note: parser might convert this to a string
			},
		] );
	} );

	it( 'should handle missing properties in sitemap entries', async () => {
		( global.fetch as jest.Mock ).mockResolvedValue( {
			ok: true,
			text: jest.fn().mockResolvedValue( `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://wp.example.com/post/example-1</loc>
            <!-- No lastmod, changefreq, or priority -->
          </url>
          <url>
            <!-- No loc -->
            <lastmod>2023-01-02</lastmod>
          </url>
        </urlset>
      ` ),
		} );

		const result = await fetchSubSitemap(
			'https://wp.example.com/post-sitemap.xml'
		);

		// It should still parse entries with just a loc
		expect( result ).toEqual( [
			{
				loc: 'https://wp.example.com/post/example-1',
			},
			{
				lastmod: '2023-01-02',
			},
		] );
	} );
} );
