import { XMLParser, type X2jOptions } from 'fast-xml-parser';
import { Logger } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import type { SitemapDataFromXML } from '@snapwp/types';

const XMLParserConfig: Partial< X2jOptions > = {
	ignoreAttributes: false,
	preserveOrder: false,
	unpairedTags: [ 'xml', 'xml-stylesheet' ],
	processEntities: true,
	htmlEntities: true,
};

/**
 * Fetches the sitemap index from WordPress and parses it into an array of SitemapData.
 *
 * @param {X2jOptions} customXMLParserConfig - Custom XML parser configuration.
 *
 * @return {Promise<SitemapDataFromXML[]>} - An array of SitemapData objects.
 */
export const fetchIndexSitemap = async (
	customXMLParserConfig?: X2jOptions
): Promise< SitemapDataFromXML[] > => {
	const { wpHomeUrl, sitemap: sitemapConfig } = getConfig();

	if ( ! sitemapConfig?.indexUri ) {
		return [];
	}

	const wpSitemapIndexPath = `${ wpHomeUrl }/${ sitemapConfig.indexUri }`;

	const response = await fetch( wpSitemapIndexPath );

	if ( ! response.ok ) {
		Logger.error(
			`Failed to fetch sitemap index from WordPress at ${ wpSitemapIndexPath }`
		);

		return [];
	}

	const xmlResponse = await response.text();

	/**
	 * Create a parser to convert our XML data into a JS object
	 *
	 * @link https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/6.HTMLParsing.md
	 */
	const parser = new XMLParser( {
		...XMLParserConfig,
		...customXMLParserConfig,
		/**
		 * FXP can't determine if a single tag should be parsed as an array or
		 * an object, so we need to specify we always want "sitemap" tags to be an
		 * array.
		 *
		 * @param {string} tagName The name of the tag to check.
		 * @see https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#isarray
		 *
		 * @return {boolean} True if the tag should be parsed as an array, false otherwise.
		 */
		isArray: ( tagName: string ): boolean => {
			return tagName === 'sitemap';
		},
	} );

	// JS object representation of the XML sitemap index
	const parsedSitemapIndex = parser.parse( xmlResponse );
	const wpSitemaps = parsedSitemapIndex?.sitemapindex
		?.sitemap as SitemapDataFromXML[];

	if ( ! wpSitemaps ) {
		Logger.error(
			`No sitemaps found in the sitemap index at ${ wpSitemapIndexPath }`
		);
		return [];
	}

	return wpSitemaps;
};

/**
 * Fetches a sub-sitemap from WordPress and parses it into an array of SitemapData.
 *
 * @param {string} wpSubSitemapUrl - The url to the sub-sitemap.
 * @param {X2jOptions}customXMLParserConfig - Custom XML parser configuration.
 *
 * @return {Promise<SitemapDataFromXML[]>} - An array of SitemapData objects.
 */
export const fetchSubSitemap = async (
	wpSubSitemapUrl: string,
	customXMLParserConfig?: X2jOptions
): Promise< SitemapDataFromXML[] > => {
	const response = await fetch( wpSubSitemapUrl );

	if ( ! response.ok ) {
		Logger.error(
			`Failed to fetch sitemap from WordPress at ${ wpSubSitemapUrl }`
		);

		return [];
	}

	const xmlResponse = await response.text();

	const parser = new XMLParser( {
		...XMLParserConfig,
		...customXMLParserConfig,
		/**
		 * FXP can't determine if a single tag should be parsed as an array or
		 * an object, so we need to specify we always want "sitemap" tags to be an
		 * array.
		 *
		 * @param {string} tagName The name of the tag to check.
		 * @see https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#isarray
		 *
		 * @return {boolean} True if the tag should be parsed as an array, false otherwise.
		 */
		isArray: ( tagName: string ): boolean => {
			return tagName === 'url';
		},
	} );

	const parsedSitemapIndex = parser.parse( xmlResponse );
	const wpSitemaps = parsedSitemapIndex?.urlset?.url as SitemapDataFromXML[];

	if ( ! wpSitemaps ) {
		Logger.error(
			`No sitemaps found in the sitemap index at ${ wpSubSitemapUrl }`
		);
		return [];
	}

	return wpSitemaps;
};
