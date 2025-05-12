import { toFrontendUri } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import {
	generateIndexSitemap,
	generateSubSitemaps,
	getSitemapPaths,
} from '../index';
import { fetchIndexSitemap, fetchSubSitemap } from '../services';
import { parseSitemap, shouldIgnoreSitemapPath } from '../utils';

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

describe( 'Sitemap functions', () => {
	//
	describe( 'getSitemapPaths', () => {
		it( 'should return an array of sitemap IDs', async () => {
			// Mock data
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				const { parseSitemap: actualParseSitemap } =
					jest.requireActual( '../utils' );
				return actualParseSitemap( sitemap );
			} );

			const result = await getSitemapPaths();

			expect( fetchIndexSitemap ).toHaveBeenCalledTimes( 1 );
			expect( parseSitemap ).toHaveBeenCalledTimes( 2 );
			expect( result ).toEqual( [
				{ id: 'post-sitemap' },
				{ id: 'page-sitemap' },
			] );
		} );

		it( 'should skip sitemaps that should be ignored', async () => {
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				// Simulate that admin-sitemap should be filtered out
				if ( sitemap.loc.includes( 'admin-sitemap' ) ) {
					return undefined; // parseSitemap will return undefined for ignored paths
				}
				const { parseSitemap: actualParseSitemap } =
					jest.requireActual( '../utils' );
				return actualParseSitemap( sitemap );
			} );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [ { id: 'post-sitemap' } ] );
		} );

		it( 'should handle URLs with leading slashes', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com//post-sitemap.xml',
					lastmod: '2023-01-01',
				},
			];

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				const { parseSitemap: actualParseSitemap } =
					jest.requireActual( '../utils' );
				return actualParseSitemap( sitemap );
			} );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [ { id: 'post-sitemap' } ] );
		} );

		it( 'should pass custom XML parser config to fetchIndexSitemap', async () => {
			const customConfig = { allowBooleanAttributes: true };

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			await getSitemapPaths( customConfig );

			expect( fetchIndexSitemap ).toHaveBeenCalledWith( customConfig );
		} );

		it( 'should handle empty sitemap response', async () => {
			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [] );
		} );

		it( 'should handle null response from parseSitemap', async () => {
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				// Return null for the first sitemap to simulate invalid data
				if ( sitemap.loc.includes( 'post-sitemap' ) ) {
					return undefined;
				}
				const { parseSitemap: actualParseSitemap } =
					jest.requireActual( '../utils' );

				return actualParseSitemap( sitemap );
			} );

			const result = await getSitemapPaths();

			expect( result ).toEqual( [ { id: 'page-sitemap' } ] );
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				const { parseSitemap: actualParseSitemap } =
					jest.requireActual( '../utils' );
				return actualParseSitemap( sitemap );
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

		it( 'should skip sitemaps that should be ignored', async () => {
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				// Simulate that admin-sitemap should be filtered out
				if ( sitemap.loc.includes( 'admin-sitemap' ) ) {
					return undefined; // parseSitemap will return undefined for ignored paths
				}
				const { parseSitemap: actualParseSitemap } =
					jest.requireActual( '../utils' );
				return actualParseSitemap( sitemap );
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
			const customConfig = { allowBooleanAttributes: true };

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );

			await generateIndexSitemap( customConfig );

			expect( fetchIndexSitemap ).toHaveBeenCalledWith( customConfig );
		} );

		it( 'should handle null response from parseSitemap', async () => {
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchIndexSitemap as jest.Mock ).mockResolvedValue(
				mockSitemaps
			);

			// Fix the mock implementation to match the actual implementation
			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				// Return undefined for the first sitemap to simulate invalid data
				if ( sitemap.loc.includes( 'post-sitemap' ) ) {
					return undefined;
				}

				// Return an object that matches the structure of what parseSitemap would return
				return {
					// Use toFrontendUri to transform the URL correctly
					// This should be just the path part, not the full URL
					url: sitemap.loc.replace( 'https://wp.example.com/', '/' ),
					// Return lastModified as a Date object, not lastmod as a string
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await generateIndexSitemap();

			expect( result ).toEqual( [
				{
					url: 'https://example.com/sitemap/page-sitemap.xml',
					// Fix the property name to match the actual implementation
					lastModified: new Date( '2023-01-02' ),
				},
			] );
		} );

		it( 'should handle empty sitemap response', async () => {
			( fetchIndexSitemap as jest.Mock ).mockResolvedValue( [] );
			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );
			const result = await generateIndexSitemap();

			expect( result ).toEqual( [] );
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				return {
					url: sitemap.loc.replace( 'https://wp.example.com/', '' ),
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

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

		it( 'should skip URLs that should be ignored', async () => {
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				// Simulate that admin URLs should be filtered out
				if ( sitemap.loc.includes( '/admin' ) ) {
					return undefined; // parseSitemap will return undefined for ignored paths
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
			const customConfig = { allowBooleanAttributes: true };

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [] );

			await generateSubSitemaps( 'post-sitemap', customConfig );

			expect( fetchSubSitemap ).toHaveBeenCalledWith(
				'https://wp.example.com/post-sitemap.xml',
				customConfig
			);
		} );

		it( 'should handle custom paths from sitemap config', async () => {
			const customPaths = [
				{
					url: 'custom-path1',
					lastModified: new Date( '2023-01-03' ), // Use lastModified as Date object
				},
				{
					url: 'custom-path2',
					lastModified: new Date( '2023-01-04' ), // Use lastModified as Date object
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
				{
					loc: 'https://wp.example.com/post/example2',
					lastmod: '2023-01-02',
				},
			];

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				return {
					url: sitemap.loc.replace( 'https://wp.example.com/', '' ),
					lastModified: new Date( sitemap.lastmod ),
				};
			} );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( result ).toEqual( [
				{
					url: 'https://example.com/custom-path1',
					lastModified: new Date( '2023-01-03' ),
				},
				{
					url: 'https://example.com/custom-path2',
					lastModified: new Date( '2023-01-04' ),
				},
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

		it( 'should handle null custom paths', async () => {
			const customPaths = [
				null,
				{
					url: 'custom-path2',
					lastModified: new Date( '2023-01-04' ), // Use lastModified as Date object
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
					url: 'https://example.com/custom-path2',
					lastModified: new Date( '2023-01-04' ),
				},
			] );
		} );

		it( 'should handle undefined custom paths for requested id', async () => {
			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
				sitemap: {
					customPaths: {
						'other-sitemap': [
							{
								url: 'other-path',
								lastModified: new Date( '2023-01-05' ), // Use lastModified as Date object
							},
						],
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

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
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

		it( 'should handle undefined sitemap config', async () => {
			const mockSitemaps = [
				{
					loc: 'https://wp.example.com/post/example1',
					lastmod: '2023-01-01',
				},
			];

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
				// No sitemap config provided
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
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

		it( 'should handle urls with leading slashes in custom paths', async () => {
			const customPaths = [
				{
					url: '/custom-path1',
					lastModified: new Date( '2023-01-03' ), // Use lastModified as Date object
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
					url: 'https://example.com/custom-path1',
					lastModified: new Date( '2023-01-03' ),
				},
			] );
		} );

		it( 'should handle null response from parseSitemap', async () => {
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

			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( mockSitemaps );

			( parseSitemap as jest.Mock ).mockImplementation( ( sitemap ) => {
				// Return undefined for the first sitemap to simulate invalid data
				if ( sitemap.loc.includes( 'example1' ) ) {
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
					url: 'https://example.com/post/example2',
					lastModified: new Date( '2023-01-02' ),
				},
			] );
		} );

		it( 'should handle empty response from fetchSubSitemap', async () => {
			( getConfig as jest.Mock ).mockReturnValue( {
				frontendUrl: 'https://example.com',
				wpHomeUrl: 'https://wp.example.com',
				wpSiteUrl: 'https://wp.example.com',
			} );

			( fetchSubSitemap as jest.Mock ).mockResolvedValue( [] );

			const result = await generateSubSitemaps( 'post-sitemap' );

			expect( result ).toEqual( [] );
		} );
	} );
} );
