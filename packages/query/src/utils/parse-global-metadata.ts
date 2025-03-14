import type { GetGlobalMetadataQuery } from '@graphqlTypes/graphql';
import type { ParsedGlobalMetadata } from '@snapwp/types';

/**
 * Parses global metadata (site-wide settings).
 *
 * @param data - The GraphQL query result for global metadata.
 * @return Parsed global metadata.
 */
export default function parseGlobalMetadata(
	data: GetGlobalMetadataQuery
): ParsedGlobalMetadata {
	if ( ! data || ! data.generalSettings ) {
		return {};
	}

	const { generalSettings } = data;

	return {
		siteTitle: generalSettings.title ?? undefined,
		description: generalSettings.description ?? undefined,
		locale: generalSettings.language ?? undefined,
	};
}
