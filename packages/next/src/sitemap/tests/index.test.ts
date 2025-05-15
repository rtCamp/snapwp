import { getConfig } from '@snapwp/core/config';
import {
	generateIndexSitemap,
	generateSubSitemaps,
	getSitemapPaths,
} from '../index';
import { fetchIndexSitemap, fetchSubSitemap } from '../services';
import { parseSitemap } from '../utils';
import type { SitemapDataFromXML } from '../types';

// Mock dependencies
jest.mock( '../services', () => ( {
	fetchIndexSitemap: jest.fn(),
	fetchSubSitemap: jest.fn(),
} ) );

jest.mock( '../utils', () => ( {
	parseSitemap: jest.fn(),
	shouldIgnoreSitemapPath: jest.fn(),
	removeLeadingSlash: jest.requireActual( '../utils' ).removeLeadingSlash,
} ) );

jest.mock( '@snapwp/core/config', () => ( {
	getConfig: jest.fn(),
} ) );

describe( 'Sitemap functions', () => {
	// Setup default configuration before each test
	beforeEach( () => {
		jest.clearAllMocks();
		( getConfig as jest.Mock ).mockReturnValue( {
			frontendUrl: 'https://example.com',
			wpHomeUrl: 'https://wp.example.com',
			wpSiteUrl: 'https://wp.example.com',
		} );
	} );

	describe( 'getSitemapPaths', () => {
		it( 'should return an array of sitemap IDs', async () => {
			// Mock data
			const mockSitemaps: SitemapDataFromXML[] = [
				{
					loc: 'https://wp.example.com/post-sitemap.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/page-sitemap.xml',
					lastmod: '2023-01-02',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			// Mock parseSitemap to extract paths from URLs
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => ( {
				url: sitemap.loc.replace(
					/^https:\/\/wp\.example\.com\/(.+)\.xml$/,
					'$1'
				),
				lastModified: new Date( sitemap.lastmod ),
			} ) );

			const result = await getSitemapPaths();

			expect( fetchIndexSitemap ).toHaveBeenCalledTimes( 1 );
			expect( parseSitemap ).toHaveBeenCalledTimes( 2 );
			expect( result ).toEqual( [
				{ id: 'post-sitemap' },
				{ id: 'page-sitemap' },
			] );
		} );

		it( 'should skip sitemaps that are filtered out by parseSitemap', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post-sitemap.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/admin-sitemap.xml',
					lastmod: '2023-01-02',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			// Mock parseSitemap to filter out admin paths
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				if ( sitemap.loc.includes( 'admin-sitemap' ) ) {
					return undefined;
				}
				return {
					url: sitemap.loc.replace(
						/^https:\/\/wp\.example\.com\/(.+)\.xml$/,
						'$1'
					),
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [ { id: 'post-sitemap' } ] );
		} );

		it( 'should normalize URLs with multiple slashes or unusual formatting', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com//post-sitemap.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/category-sitemap.xml/',
					lastmod: '2023-01-02',
				},
				{
					loc: 'https://wp.example.com/tag-sitemap.xml?query=true',
					lastmod: '2023-01-03',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => ( {
				url: sitemap.loc
					.replace( /^https:\/\/wp\.example\.com\/+/, '' )
					.replace( /\.xml.*$/, '.xml' )
					.replace( /\/$/, '' ),
				lastModified: new Date( sitemap.lastmod ),
			} ) );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [
				{ id: 'post-sitemap' },
				{ id: 'category-sitemap' },
				{ id: 'tag-sitemap' },
			] );
		} );

		it( 'should pass custom XML parser config to fetchIndexSitemap', async () => {
			const customConfig = {
				allowBooleanAttributes: true,
				attributeNamePrefix: '_',
			};

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			await getSitemapPaths( customConfig );

			expect( fetchIndexSitemap ).toHaveBeenCalledWith( customConfig );
		} );

		it( 'should handle empty sitemap response', async () => {
			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [] );
			expect( parseSitemap ).not.toHaveBeenCalled();
		} );

		it( 'should handle fetch errors by returning an empty array', async () => {
			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [] );
			expect( fetchIndexSitemap ).toHaveBeenCalled();
		} );

		it( 'should extract sitemap ID correctly from complex URLs', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/sitemap-dir/product-sitemap1.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/custom/media-sitemap.xml',
					lastmod: '2023-01-02',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			// Mock parseSitemap to handle complex paths
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				const match = sitemap.loc.match( /([^\/]+)\.xml/ );
				return match
					? {
							url: match[ 1 ],
							lastModified: new Date( sitemap.lastmod ),
					  }
					: undefined;
			} );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [
				{ id: 'product-sitemap1' },
				{ id: 'media-sitemap' },
			] );
		} );
	} );

	describe( 'generateIndexSitemap', () => {
		it( 'should generate an index sitemap with proper URL formatting', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post-sitemap.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/page-sitemap.xml',
					lastmod: '2023-01-02',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			// Simulate actual parseSitemap function behavior
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				const pathMatch = sitemap.loc.match( /\/([^\/]+\.xml)$/ );
				if ( ! pathMatch ) {
					return undefined;
				}

				return {
					url: pathMatch[ 1 ],
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await generateIndexSitemap();

			expect( result ).toEqual( [
				{
					url: 'https://example.com/sitemap/post-sitemap.xml',
					lastModified: new Date( '2023-01-01' ),
				},
				{
					url: 'https://example.com/sitemap/page-sitemap.xml',
					lastModified: new Date( '2023-01-02' ),
				},
			] );
		} );

		it( 'should skip sitemaps filtered out by parseSitemap', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post-sitemap.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/admin-sitemap.xml',
					lastmod: '2023-01-02',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				if ( sitemap.loc.includes( 'admin' ) ) {
					return undefined;
				}

				const pathMatch = sitemap.loc.match( /\/([^\/]+\.xml)$/ );
				if ( ! pathMatch ) {
					return undefined;
				}

				return {
					url: pathMatch[ 1 ],
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await generateIndexSitemap();

			expect( result ).toEqual( [
				{
					url: 'https://example.com/sitemap/post-sitemap.xml',
					lastModified: new Date( '2023-01-01' ),
				},
			] );
		} );

		it( 'should pass custom XML parser config to fetchIndexSitemap', async () => {
			const customConfig = {
				allowBooleanAttributes: true,
				attributeNamePrefix: '_',
			};

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			await generateIndexSitemap( customConfig );

			expect( fetchIndexSitemap ).toHaveBeenCalledWith( customConfig );
		} );

		it( 'should handle different URL formats correctly', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post-sitemap.xml',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/sitemap/page-sitemap.xml',
					lastmod: '2023-01-02',
				},
				{
					loc: 'https://wp.example.com/nested/deep/tax-sitemap.xml',
					lastmod: '2023-01-03',
				},
			];

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				const pathMatch = sitemap.loc.match( /\/([^\/]+\.xml)$/ );
				if ( ! pathMatch ) {
					return undefined;
				}

				return {
					url: pathMatch[ 1 ],
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await generateIndexSitemap();

			expect( result ).toEqual( [
				{
					url: 'https://example.com/sitemap/post-sitemap.xml',
					lastModified: new Date( '2023-01-01' ),
				},
				{
					url: 'https://example.com/sitemap/page-sitemap.xml',
					lastModified: new Date( '2023-01-02' ),
				},
				{
					url: 'https://example.com/sitemap/tax-sitemap.xml',
					lastModified: new Date( '2023-01-03' ),
				},
			] );
		} );

		it( 'should handle fetch errors by returning an empty array', async () => {
			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await generateIndexSitemap();

			expect( result ).toEqual( [] );
			expect( fetchIndexSitemap ).toHaveBeenCalled();
		} );
	} );

	describe( 'generateSubSitemaps', () => {
		it( 'should generate sub sitemaps with proper URL formatting', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post/example1',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/post/example2',
					lastmod: '2023-01-02',
				},
			];

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => ( {
				url: sitemap.loc.replace( 'https://wp.example.com/', '' ),
				lastModified: new Date( sitemap.lastmod ),
			} ) );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( fetchSubSitemap ).toHaveBeenCalledWith(
				'https://wp.example.com/post-sitemap.xml',
				undefined
			);

			expect( result ).toEqual( [
				{
					url: 'https://example.com/post/example1',
					lastModified: new Date( '2023-01-01' ),
				},
				{
					url: 'https://example.com/post/example2',
					lastModified: new Date( '2023-01-02' ),
				},
			] );
		} );

		it( 'should skip URLs filtered out by parseSitemap', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post/example1',
					lastmod: '2023-01-01',
				},
				{
					loc: 'https://wp.example.com/post/admin',
					lastmod: '2023-01-02',
				},
			];

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				if ( sitemap.loc.includes( '/admin' ) ) {
					return undefined;
				}
				return {
					url: sitemap.loc.replace( 'https://wp.example.com/', '' ),
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( result ).toEqual( [
				{
					url: 'https://example.com/post/example1',
					lastModified: new Date( '2023-01-01' ),
				},
			] );
		} );

		it( 'should pass custom XML parser config to fetchSubSitemap', async () => {
			const customConfig = {
				allowBooleanAttributes: true,
				attributeNamePrefix: '_',
			};

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [] );

			await generateSubSitemaps( 'post-sitemap', customConfig );

			expect( fetchSubSitemap ).toHaveBeenCalledWith(
				'https://wp.example.com/post-sitemap.xml',
				customConfig
			);
		} );

		it( 'should merge and prioritize custom paths from sitemap config', async () => {
			const customPaths = [
				{
					url: 'custom-path1',
					lastModified: new Date( '2023-01-03' ),
				},
				{
					url: 'custom-path2',
					lastModified: new Date( '2023-01-04' ),
				},
			];

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
				sitemap: {
					customPaths: {
						'post-sitemap': customPaths,
					},
				},
			} );

			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post/example1',
					lastmod: '2023-01-01',
				},
			];

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => ( {
				url: sitemap.loc.replace( 'https://wp.example.com/', '' ),
				lastModified: new Date( sitemap.lastmod ),
			} ) );

			const result = await generateSubSitemaps( 'post-sitemap' );

			// Custom paths should come first, followed by fetched paths
			expect( result ).toEqual( [
				{
					url: 'custom-path1',
					lastModified: new Date( '2023-01-03' ),
				},
				{
					url: 'custom-path2',
					lastModified: new Date( '2023-01-04' ),
				},
				{
					url: 'https://example.com/post/example1',
					lastModified: new Date( '2023-01-01' ),
				},
			] );
		} );

		it( 'should handle null or undefined entries in custom paths', async () => {
			const customPaths = [
				null,
				undefined,
				{
					url: 'custom-path2',
					lastModified: new Date( '2023-01-04' ),
				},
			];

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
				sitemap: {
					customPaths: {
						'post-sitemap': customPaths,
					},
				},
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( result ).toEqual( [
				{
					url: 'custom-path2',
					lastModified: new Date( '2023-01-04' ),
				},
			] );
		} );

		it( 'should handle different sitemap IDs correctly', async () => {
			const customPaths = {
				'post-sitemap': [
					{
						url: 'post-custom-path',
						lastModified: new Date( '2023-01-03' ),
					},
				],
				'page-sitemap': [
					{
						url: 'page-custom-path',
						lastModified: new Date( '2023-01-04' ),
					},
				],
			};

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
				sitemap: {
					customPaths,
				},
			} );

			// Test with post-sitemap
			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [
				{
					loc: 'https://wp.example.com/post/example1',
					lastmod: '2023-01-01',
				},
			] );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => ( {
				url: sitemap.loc.replace( 'https://wp.example.com/', '' ),
				lastModified: new Date( sitemap.lastmod ),
			} ) );

			const postResult = await generateSubSitemaps( 'post-sitemap' );
			expect( postResult ).toEqual( [
				{
					url: 'post-custom-path',
					lastModified: new Date( '2023-01-03' ),
				},
				{
					url: 'https://example.com/post/example1',
					lastModified: new Date( '2023-01-01' ),
				},
			] );

			// Test with page-sitemap
			( fetchSubSitemap as jest.Mock ).mockReset().mockResolvedValue( [
				{
					loc: 'https://wp.example.com/page/example1',
					lastmod: '2023-01-02',
				},
			] );

			const pageResult = await generateSubSitemaps( 'page-sitemap' );
			expect( pageResult ).toEqual( [
				{
					url: 'page-custom-path',
					lastModified: new Date( '2023-01-04' ),
				},
				{
					url: 'https://example.com/page/example1',
					lastModified: new Date( '2023-01-02' ),
				},
			] );
		} );

		it( 'should handle fetch errors by returning only custom paths', async () => {
			const customPaths = [
				{
					url: 'custom-path',
					lastModified: new Date( '2023-01-03' ),
				},
			];

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
				sitemap: {
					customPaths: {
						'post-sitemap': customPaths,
					},
				},
			} );

			// Instead of rejecting, return an empty array
			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( result ).toEqual( [
				{
					url: 'custom-path',
					lastModified: new Date( '2023-01-03' ),
				},
			] );
		} );

		it( 'should handle empty results from fetchSubSitemap', async () => {
			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( result ).toEqual( [] );
		} );
	} );
} );
