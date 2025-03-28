/**
 * Represents the metadata for a route.
 */
export type SiteMetadata = Partial< {
	title: string;
	description: string;
	authors: { name: string }[];
	image: {
		url?: string;
		width?: number;
		height?: number;
	};
} >;
