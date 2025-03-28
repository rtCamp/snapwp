import { getCleanExcerpt } from '@/seo/utils';
import { RouteMetadataSchema } from '@snapwp/types';
import type { Parser } from '../type';
import type { SiteMetadata } from './types';

/**
 * Parses the route metadata from the given data.
 *
 * @param data - The data to parse.
 * @return The parsed route metadata.
 */
const parseRouteMetadata: Parser< SiteMetadata > = ( data: unknown ) => {
	const parsedData = RouteMetadataSchema.safeParse( data );
	if ( ! parsedData.success || ! parsedData.data.nodeByUri ) {
		return {};
	}

	const node = parsedData.data.nodeByUri;
	const metadata: SiteMetadata = {};

	switch ( node.__typename ) {
		case 'Page':
			if ( node.title ) {
				metadata.title = node.title;
			}
			if ( node.content ) {
				metadata.description = getCleanExcerpt( node.content );
			}
			if ( node.author?.node?.name ) {
				metadata.authors = [ { name: node.author.node.name } ];
			}
			break;
		case 'Post':
			if ( node.title ) {
				metadata.title = node.title;
			}
			if ( node.excerpt ) {
				metadata.description = getCleanExcerpt( node.excerpt );
			}
			if ( node.author?.node?.name ) {
				metadata.authors = [ { name: node.author.node.name } ];
			}
			break;
		case 'Category':
		case 'Tag':
		case 'User':
			if ( node.name ) {
				metadata.title = node.name;
			}
			if ( node.description ) {
				metadata.description = getCleanExcerpt( node.description );
			}
			break;
		default:
			break;
	}

	const imageUrl = node.featuredImage?.node?.sourceUrl;
	if ( imageUrl ) {
		metadata.image = {
			url: imageUrl,
			...( node.featuredImage?.node?.mediaDetails?.width && {
				width: node.featuredImage.node.mediaDetails.width,
			} ),
			...( node.featuredImage?.node?.mediaDetails?.height && {
				height: node.featuredImage.node.mediaDetails.height,
			} ),
		};
	}

	return metadata;
};

export default parseRouteMetadata;
