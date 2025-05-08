import type { MetadataRoute } from 'next';

export type SitemapConfig = {
	indexUri?: string;
	ignorePatterns?: string[];
	customPaths?: SitemapCustomPath;
};

export type SitemapData = Omit<
	MetadataRoute.Sitemap[ number ],
	'videos' | 'images'
>;

export type SitemapCustomPath = {
	[ subType: string ]: SitemapData[];
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
