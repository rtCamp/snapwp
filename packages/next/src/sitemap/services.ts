import { XMLParser, type X2jOptions } from 'fast-xml-parser';
import { Logger } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import { type SitemapDataFromXML } from '@/sitemap/utils';

const XMLParserConfig: Partial< X2jOptions > = {
	ignoreAttributes: false,
	preserveOrder: false,
	unpairedTags: [ 'xml', 'xml-stylesheet' ],
	processEntities: true,
	htmlEntities: true,
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

	if ( ! sitemapConfig?.config?.indexSitemapUri ) {
		return [];
	}

	const wpSitemapIndexPath = `${ wpHomeUrl }/${ sitemapConfig.config.indexSitemapUri }`;

	const res = await fetch( wpSitemapIndexPath );

	if ( ! res.ok ) {
		Logger.error(
			`Failed to fetch sitemap index from WordPress at ${ wpSitemapIndexPath }`
		);

		return [];
	}

	const xmlRes = await res.text();

	/**
	 * Create a parser to convert our XML data into a JS object
	 *
	 * @link https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/6.HTMLParsing.md
	 */
	const parser = new XMLParser( {
		...XMLParserConfig,
		...customXMLParserConfig,
	} );

	// JS object representation of the XML sitemap index
	const parsedSitemapIndex = parser.parse( xmlRes );
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
 * @param {string} id - The ID of the sub-sitemap to fetch.
 * @param {X2jOptions}customXMLParserConfig - Custom XML parser configuration.
 *
 * @return {Promise<SitemapDataFromXML[]>} - An array of SitemapData objects.
 */
export const fetchSubSitemap = async (
	id: string,
	customXMLParserConfig?: X2jOptions
): Promise< SitemapDataFromXML[] > => {
	const { wpHomeUrl } = getConfig();

	const wpSubSitemapPath = `${ wpHomeUrl }/${ id }.xml`;

	const res = await fetch( wpSubSitemapPath );

	if ( ! res.ok ) {
		Logger.error(
			`Failed to fetch sitemap from WordPress at ${ wpSubSitemapPath }`
		);

		return [];
	}

	const xmlRes = await res.text();

	const parser = new XMLParser( {
		...XMLParserConfig,
		...customXMLParserConfig,
	} );

	const parsedSitemapIndex = parser.parse( xmlRes );
	const wpSitemaps = parsedSitemapIndex?.urlset?.url as SitemapDataFromXML[];

	if ( ! wpSitemaps ) {
		Logger.error(
			`No sitemaps found in the sitemap index at ${ wpSubSitemapPath }`
		);
		return [];
	}

	return wpSitemaps;
};
