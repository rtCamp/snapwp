import type { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

export interface Node {
	title: string | null | undefined;
	featuredImage:
		| {
				node:
					| {
							sourceUrl: string | null | undefined;
							mediaDetails:
								| {
										width: number | null | undefined;
										height: number | null | undefined;
								  }
								| null
								| undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
}

/**
 * Parses out Twitter metadata.
 *
 * @param {Node} node - The data to parse for Twitter information.
 * @return Parsed Twitter metadata for the given route.
 */
export const parseNode = < T extends Node >( node: T ) => {
	const title = node.title || undefined;
	const images: Twitter[ 'images' ] = [];

	if ( node.featuredImage?.node?.sourceUrl ) {
		images.push( {
			url: node.featuredImage.node.sourceUrl,
			width: node.featuredImage.node.mediaDetails?.width || undefined,
			height: node.featuredImage.node.mediaDetails?.height || undefined,
		} );
	}

	return {
		twitter: {
			title,
			images,
		},
	};
};
