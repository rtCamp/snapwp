/**
 * Type for parsed global metadata.
 */
export type ParsedGlobalMetadata = {
	siteTitle?: string;
	description?: string;
	locale?: string;
};

/**
 * Type for parsed route metadata.
 */
export type ParsedRouteMetadata = {
	title?: string;
	description?: string;
	authors?: { name: string }[];
};

/**
 * Type for parsed Open Graph metadata.
 */
export type ParsedOpenGraphMetadata = {
	title?: string;
	url?: string;
	type?: 'article' | 'website';
	images?: { url: string; width?: number; height?: number }[];
	description?: string;
	publishedTime?: string;
	modifiedTime?: string;
};

/**
 * Type for parsed Twitter metadata.
 */
export type ParsedTwitterMetadata = {
	title?: string;
	description?: string;
	image?: {
		url: string;
		width?: number;
		height?: number;
	};
};
