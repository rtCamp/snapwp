/**
 * Type for parsed global metadata.
 */
export type ParsedGlobalMetadata = {
	siteTitle?: string | undefined;
	description?: string | undefined;
	locale?: string | undefined;
};

/**
 * Type for parsed route metadata.
 */
export type ParsedRouteMetadata = {
	title?: string | undefined;
	description?: string | undefined;
	authors?: { name: string }[] | undefined;
};

/**
 * Type for parsed Open Graph metadata.
 */
export type ParsedOpenGraphMetadata = {
	title?: string | undefined;
	url?: string | undefined;
	type?: 'article' | 'website';
	images?:
		| {
				url: string;
				width?: number | undefined;
				height?: number | undefined;
		  }[]
		| undefined;
	description?: string | undefined;
	publishedTime?: string | undefined;
	modifiedTime?: string | undefined;
};

/**
 * Type for parsed Twitter metadata.
 */
export type ParsedTwitterMetadata = {
	title?: string | undefined;
	description?: string | undefined;
	image?:
		| {
				url: string;
				width?: number | undefined;
				height?: number | undefined;
		  }
		| undefined;
};
