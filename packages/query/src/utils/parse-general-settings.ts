import type { GetGeneralSettingsQuery } from '@graphqlTypes/graphql';

/**
 * @param {GetGeneralSettingsQuery} queryData - The data fetched from the general settings query.
 *
 * @throws Throws an error if the query data is missing or invalid.
 *
 * @return An object containing parsed general settings data.
 */
export default function parseGeneralSettings(
	queryData: GetGeneralSettingsQuery
):
	| {
			generalSettings: {
				siteIcon: {
					mediaItemUrl: string | undefined;
					mediaDetails: {
						sizes: {
							sourceUrl: string;
							height: string;
							width: string;
						}[];
					};
				};
			};
	  }
	| undefined {
	// If queryData does not have generalSettings or siteIcon, return undefined because without siteIcon, generalSettings is not valid.
	if ( ! queryData.generalSettings?.siteIcon ) {
		return undefined;
	}

	const sizes:
		| undefined
		| { sourceUrl: string; height: string; width: string }[] = [];

	// If mediaDetails and sizes are present, parse the sizes.
	if ( queryData.generalSettings.siteIcon.mediaDetails?.sizes ) {
		queryData.generalSettings.siteIcon.mediaDetails.sizes.forEach(
			( size ) => {
				// If size is null or undefined skip the iteration.
				if ( ! size ) {
					return;
				}

				// If sourceUrl, height and width are not present, skip the iteration.
				if ( ! ( size.sourceUrl && size.height && size.width ) ) {
					return;
				}

				sizes.push( {
					sourceUrl: size.sourceUrl,
					height: size.height,
					width: size.width,
				} );
			}
		);
	}

	// MediaItemUrl and mediaDetails are optional fields. Meaning if either of them is there, it should be returned.
	return {
		generalSettings: {
			siteIcon: {
				// If mediaItemUrl is not present, return undefined because it is an optional field.
				mediaItemUrl:
					queryData.generalSettings.siteIcon.mediaItemUrl ||
					undefined,
				mediaDetails: {
					sizes,
				},
			},
		},
	};
}
