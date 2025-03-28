/**
 * Represents the Twitter metadata for a route.
 */
export type TwitterMetadata = Partial< {
	title: string;
	description: string;
	image: {
		url: string;
		width?: number;
		height?: number;
	};
} >;
