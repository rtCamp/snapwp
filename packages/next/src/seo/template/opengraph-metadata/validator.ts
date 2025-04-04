// import type { OpenGraphMetadata } from './types';
// import { getCleanExcerpt } from '@/seo/utils';
// import { RouteOpenGraphMetadataSchema } from './schema';
// import type { RouteValidator } from '../types';

// /**
//  * Fetches and parses Open Graph metadata for a given route.
//  *
//  * @param path - The route path to fetch metadata for.
//  * @param options - Optional functions for fetching and parsing metadata.
//  * @param data
//  * @return Parsed Open Graph metadata.
//  */
// const validateRouteOpenGraphMetadata: RouteValidator< OpenGraphMetadata > = (
// 	path: string,
// 	data: unknown
// ) => {
// 	const parsedData = RouteOpenGraphMetadataSchema.safeParse( data );
// 	if ( ! parsedData.success || ! parsedData.data.nodeByUri ) {
// 		return {};
// 	}

// 	const node = parsedData.data.nodeByUri;
// 	const result: OpenGraphMetadata = {
// 		url: node.uri || path,
// 		type: node.__typename === 'Post' ? 'article' : 'website',
// 	};

// 	switch ( node.__typename ) {
// 		case 'Post':
// 			if ( node.title ) {
// 				result.title = node.title;
// 			}
// 			if ( node.excerpt ) {
// 				result.description = getCleanExcerpt( node.excerpt );
// 			}
// 			if ( node.date ) {
// 				result.publishedTime = node.date;
// 			}
// 			if ( node.modified ) {
// 				result.modifiedTime = node.modified;
// 			}
// 			break;
// 		case 'Page':
// 			if ( node.title ) {
// 				result.title = node.title;
// 			}
// 			if ( node.content ) {
// 				result.description = getCleanExcerpt( node.content );
// 			}
// 			if ( node.date ) {
// 				result.publishedTime = node.date;
// 			}
// 			if ( node.modified ) {
// 				result.modifiedTime = node.modified;
// 			}
// 			break;
// 		case 'Category':
// 		case 'Tag':
// 		case 'User':
// 			if ( node.name ) {
// 				result.title = node.name;
// 			}
// 			if ( node.description ) {
// 				result.description = getCleanExcerpt( node.description );
// 			}
// 			break;
// 	}

// 	const imageUrl = node.featuredImage?.node?.sourceUrl;
// 	if ( imageUrl ) {
// 		result.images = [
// 			{
// 				url: imageUrl,
// 				...( node.featuredImage?.node?.mediaDetails?.width && {
// 					width: node.featuredImage.node.mediaDetails.width,
// 				} ),
// 				...( node.featuredImage?.node?.mediaDetails?.height && {
// 					height: node.featuredImage.node.mediaDetails.height,
// 				} ),
// 			},
// 		];
// 	}

// 	return result;
// };

// export default validateRouteOpenGraphMetadata;
