import type { RouteParser } from '../types';
import type { TwitterMetadata } from './types';

/**
 * Parses the Twitter metadata.
 *
 * @param data - The data to parse for Twitter information.
 * @return Parsed Twitter metadata for the given route.
 */
const parseRouteTwitterMetadata: RouteParser< TwitterMetadata > = (
	data: TwitterMetadata
) => {
	const { image, description, title } = data;
	return {
		twitter: {
			title,
			description,
			...( image && { images: [ image ] } ),
		},
	};
};

export default parseRouteTwitterMetadata;
