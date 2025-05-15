import { Logger, removeLeadingSlash } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import { fetchIndexSitemap, fetchSubSitemap } from '@/sitemap/services';
import { parseSitemap } from '@/sitemap/utils';
import type { SitemapDataFromXML } from '@/sitemap/types';
import type { SitemapData } from '@snapwp/types';
import type { X2jOptions } from 'fast-xml-parser';

/**
 * Generate sitemaps by fetching the index sitemap and mapping the URLs to a specific format.
 *
 * @param {X2jOptions} customXMLParserConfig - Custom XML parser configuration.
 *
 * @return {Promise<{ id: string }[]>} - An array of objects containing the sitemap IDs.
 */
export const getSitemapPaths = async (
	customXMLParserConfig?: X2jOptions
): Promise< Array< { id: string } > > => {
	try {
		const wpSitemaps = await fetchIndexSitemap( customXMLParserConfig );

		const sitemapsToGenerate: Array< { id: string } > = [];

		wpSitemaps.forEach( ( wpSitemap: SitemapDataFromXML ) => {
			const data = parseSitemap( wpSitemap );

			if ( ! data ) {
				return;
			}

			data.url = removeLeadingSlash( data.url );

			// If url ends with .xml, remove it
			if ( data.url.endsWith( '.xml' ) ) {
				data.url = data.url.slice( 0, -4 );
			}

			sitemapsToGenerate.push( { id: removeLeadingSlash( data.url ) } );
		} );

		return sitemapsToGenerate;
	} catch ( error ) {
		Logger.error( `Error in getSitemapPaths: ${ error }` );
		return [];
	}
};

/**
 * Generate an index sitemap by fetching the index sitemap and mapping the URLs to a specific format.
 *
 * @param {X2jOptions} customXMLParserConfig - Custom XML parser configuration.
 *
 * @return {Promise<SitemapData[]>} - An array of SitemapData objects.
 */
export const generateIndexSitemap = async (
	customXMLParserConfig?: X2jOptions
): Promise< SitemapData[] > => {
	const wpSitemaps = await fetchIndexSitemap( customXMLParserConfig );
	const sitemaps: SitemapData[] = [];
	const { frontendUrl } = getConfig();

	wpSitemaps.forEach( ( wpSitemap: SitemapDataFromXML ) => {
		const data = parseSitemap( wpSitemap );

		if ( ! data ) {
			return;
		}

		data.url = `${ frontendUrl }/sitemap/${ removeLeadingSlash(
			data.url
		) }`;

		sitemaps.push( data );
	} );

	return sitemaps;
};

/**
 * Generate sub-sitemaps by fetching a specific sub-sitemap and mapping the URLs to a specific format.
 *
 * @param {string} id - The ID of the sub-sitemap to fetch.
 * @param {X2jOptions} customXMLParserConfig - Custom XML parser configuration.
 *
 * @return {Promise<SitemapData[]>} - An array of SitemapData objects.
 */
export const generateSubSitemaps = async (
	id: string,
	customXMLParserConfig?: X2jOptions
): Promise< SitemapData[] > => {
	const { wpHomeUrl } = getConfig();
	const wpSubSitemapUrl = `${ wpHomeUrl }/${ id }.xml`;
	const wpSitemaps = await fetchSubSitemap(
		wpSubSitemapUrl,
		customXMLParserConfig
	);

	const sitemaps: SitemapData[] = [];

	const { frontendUrl, sitemap: sitemapConfig } = getConfig();

	let customPaths: SitemapData[] = [];

	if ( sitemapConfig?.customPaths ) {
		customPaths = sitemapConfig.customPaths[ id ] || [];
	}

	customPaths.forEach( ( customPath: SitemapData ) => {
		if ( ! customPath ) {
			return;
		}

		sitemaps.push( customPath );
	} );

	wpSitemaps.forEach( ( wpSitemap: SitemapDataFromXML ) => {
		const data = parseSitemap( wpSitemap );

		if ( ! data ) {
			return;
		}

		data.url = `${ frontendUrl }/${ removeLeadingSlash( data.url ) }`;

		sitemaps.push( data );
	} );

	return sitemaps;
};
