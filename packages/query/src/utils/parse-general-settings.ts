import { Logger } from '@snapwp/core';
import type { GetGeneralSettingsQuery } from '@graphqlTypes/graphql';
import type { ApolloQueryResult } from '@apollo/client';

/**
 * @param queryData - The data fetched from the general settings query.
 *
 * @throws Throws an error if the query data is missing or invalid.
 *
 * @return An object containing parsed general settings data.
 */
export default function parseGeneralSettings(
	queryData: ApolloQueryResult< GetGeneralSettingsQuery >
) {
	if ( queryData.errors?.length ) {
		queryData.errors?.forEach( ( error ) => {
			Logger.error( `Error fetching global styles: ${ error }` );
		} );
	}

	// If queryData does not have generalSettings or siteIcon, return undefined because without siteIcon, generalSettings is not valid.
	if ( ! queryData.data.generalSettings?.siteIcon ) {
		return undefined;
	}

	let sizes;

	// If mediaDetails and sizes are present, parse the sizes.
	if ( queryData.data.generalSettings.siteIcon.mediaDetails?.sizes ) {
		queryData.data.generalSettings.siteIcon.mediaDetails.sizes.forEach(
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
					queryData.data.generalSettings.siteIcon.mediaItemUrl ||
					undefined,
				mediaDetails: {
					sizes,
				},
			},
		},
	};
}
