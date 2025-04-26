import type { MetadataRoute } from 'next';

export type SitemapConfig = {
	indexSitemapUri?: string;
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
