import type { TemplateMetadataParser } from '../types';
import type { OpenGraphMetadataFragFragment } from '@snapwp/query';

/**
 * Parses the Open Graph metadata for a specific route.
 *
 * @param _path - The route path associated with the metadata.
 * @param data - The data to parse for Open Graph information.
 * @param _data
 * @return Parsed Open Graph metadata for the given route.
 */
const parseRouteOpenGraphMetadata: TemplateMetadataParser<
	OpenGraphMetadataFragFragment
> = ( _data ) => {
	return {};
};

export default parseRouteOpenGraphMetadata;
