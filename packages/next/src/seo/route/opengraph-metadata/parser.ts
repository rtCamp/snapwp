import { getCleanExcerpt } from '@/seo/utils';
import type { Parser } from '../type';
import type { OpenGraphMetadata } from './types';
import { RouteOpenGraphMetadataSchema } from '@snapwp/types';

/**
 * Parses the Open Graph metadata for a specific route.
 *
 * @param path - The route path associated with the metadata.
 * @param data - The data to parse for Open Graph information.
 * @return Parsed Open Graph metadata for the given route.
 */
const parseOpenGraphMetadata: Parser< OpenGraphMetadata > = ( path, data ) => {
	const parsedData = RouteOpenGraphMetadataSchema.safeParse( data );
	if ( ! parsedData.success || ! parsedData.data.nodeByUri ) {
		return {};
	}

	const node = parsedData.data.nodeByUri;
	const result: OpenGraphMetadata = {
		url: node.uri || path,
		type: node.__typename === 'Post' ? 'article' : 'website',
	};

	switch ( node.__typename ) {
		case 'Post':
			if ( node.title ) {
				result.title = node.title;
			}
			if ( node.excerpt ) {
				result.description = getCleanExcerpt( node.excerpt );
			}
			if ( node.date ) {
				result.publishedTime = node.date;
			}
			if ( node.modified ) {
				result.modifiedTime = node.modified;
			}
			break;
		case 'Page':
			if ( node.title ) {
				result.title = node.title;
			}
			if ( node.content ) {
				result.description = getCleanExcerpt( node.content );
			}
			if ( node.date ) {
				result.publishedTime = node.date;
			}
			if ( node.modified ) {
				result.modifiedTime = node.modified;
			}
			break;
		case 'Category':
		case 'Tag':
		case 'User':
			if ( node.name ) {
				result.title = node.name;
			}
			if ( node.description ) {
				result.description = getCleanExcerpt( node.description );
			}
			break;
	}

	const imageUrl = node.featuredImage?.node?.sourceUrl;
	if ( imageUrl ) {
		result.images = [
			{
				url: imageUrl,
				...( node.featuredImage?.node?.mediaDetails?.width && {
					width: node.featuredImage.node.mediaDetails.width,
				} ),
				...( node.featuredImage?.node?.mediaDetails?.height && {
					height: node.featuredImage.node.mediaDetails.height,
				} ),
			},
		];
	}

	return result;
};

export default parseOpenGraphMetadata;
