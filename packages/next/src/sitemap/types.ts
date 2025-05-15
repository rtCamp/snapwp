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
