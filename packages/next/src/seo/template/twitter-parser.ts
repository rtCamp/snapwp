import type { TemplateMetadataParser } from '../types';
import type { TwitterMetadataFragFragment } from '@snapwp/query';
import type { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

/**
 * Parses the Twitter metadata.
 *
 * @param {TwitterMetadataFragFragment} data - The data to parse for Twitter information.
 * @return Parsed Twitter metadata for the given route.
 */
export const parseRouteTwitterMetadata: TemplateMetadataParser<
	TwitterMetadataFragFragment
> = ( data: TwitterMetadataFragFragment ) => {
	const node = data.connectedNode as unknown as {
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
	};

	if ( ! node ) {
		return {};
	}

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
