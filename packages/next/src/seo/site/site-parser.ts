import type { Parser } from '../types';
import type { SiteMetadataFragFragment } from '@snapwp/query';

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
export const parseGeneralSettings: Parser< SiteMetadataFragFragment > = (
	data
) => {
	if ( ! data.generalSettings ) {
		return {};
	}
	return {
		title: data.generalSettings.title,
		description: data.generalSettings.description,
		openGraph: {
			locale: data.generalSettings.language
				? data.generalSettings.language
				: undefined,
		},
	};
};
