import type { Metadata } from 'next';

export interface GeneralSettings {
	title?: string | null | undefined;
	description?: string | null | undefined;
	language?: string | null | undefined;
}

/**
 * Parses general settings into site metadata
 *
 * @param {SiteMetadataFragFragment} data - The data to parse.
 * @return The parsed root metadata.
 */
export const parseGeneralSettings = < T extends GeneralSettings >(
	generalSettings: T | null | undefined
): Metadata => {
	if ( ! generalSettings ) {
		return {};
	}
	return {
		title: generalSettings.title,
		description: generalSettings.description,
		openGraph: {
			locale: generalSettings.language
				? generalSettings.language
				: undefined,
		},
	};
};
