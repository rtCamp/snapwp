/**
 * Represents the Open Graph metadata for a route.
 */
export type OpenGraphMetadata = Partial< {
	title: string;
	url: string;
	type: 'article' | 'website';
	images?: {
		url: string;
		width?: number;
		height?: number;
	}[];
	description: string;
	publishedTime: string;
	modifiedTime: string;
} >;
