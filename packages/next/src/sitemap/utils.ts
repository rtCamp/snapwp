import { toFrontendUri } from '@snapwp/core';
import { getConfig } from '@snapwp/core/config';
import type { SitemapData } from '@snapwp/types';

/**
 * Check if the given sitemap path should be ignored based on the ignore patterns
 *
 * @param {string} loc - The sitemap path to check
 *
 * @return {boolean} - True if the path should be ignored, false otherwise
 */
export const shouldIgnoreSitemapPath = ( loc: string ): boolean => {
	const { sitemapConfig } = getConfig();
	if ( ! sitemapConfig?.ignorePatterns ) {
		return false;
	}

	const ignorePattern = sitemapConfig.ignorePatterns.find( ( pattern ) => {
		const regex = new RegExp( pattern );
		return regex.test( loc );
	} );

	return !! ignorePattern;
};

/**
 * Parses a sitemap entry from XML into a SitemapData object.
 *
 * @param {SitemapDataFromXML} sitemapDataFromXML - The sitemap entry to parse.
 *
 * @return {SitemapData | undefined} - The parsed SitemapData object or undefined if the loc is not present.
 */
export const parseSitemap = ( {
	loc,
	priority,
	lastmod,
	changeFrequency,
}: SitemapDataFromXML ): SitemapData | undefined => {
	if ( ! loc ) {
		return undefined;
	}

	if ( shouldIgnoreSitemapPath( loc ) ) {
		return undefined;
	}

	const sitemapData: SitemapData = {
		url: toFrontendUri( loc ),
	};

	if ( lastmod ) {
		sitemapData.lastModified = new Date( lastmod );
	}

	if ( changeFrequency ) {
		sitemapData.changeFrequency = changeFrequency;
	}

	if ( priority ) {
		sitemapData.priority = priority;
	}

	return sitemapData;
};

export type SitemapDataFromXML = {
	loc?: string;
	lastmod?: string | Date | undefined;
	changeFrequency?:
		| 'always'
		| 'hourly'
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'yearly'
		| 'never'
		| undefined;
	priority?: number | undefined;
};
