import type { TemplateMetadataParser } from '../types';
import type { OpenGraphMetadataFragFragment } from '@snapwp/query';

/**
 * Parses the Open Graph metadata for a specific route.
 *
 * @param {OpenGraphMetadataFragFragment} _data data
 * @return Parsed Open Graph metadata for the given route.
 */
const parseRouteOpenGraphMetadata: TemplateMetadataParser<
	OpenGraphMetadataFragFragment
> = ( _data ) => {
	return {};
};

export default parseRouteOpenGraphMetadata;
