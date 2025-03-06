import { Logger } from '@snapwp/core';
import type { ApolloQueryResult } from '@apollo/client';
import type { GetGeneralSettingsQuery } from '@graphqlTypes/graphql';
import type { GeneralSettingsProps } from '@snapwp/types';

/**
 * Parses general settings data into props for rendering a template.
 *
 * @param queryData - The data fetched from the general settings
 *
 * @throws Throws an error if the query data is missing or invalid.
 *
 * @return An object containing parsed general settings.
 */
export default function parseGeneralSettingsResult(
	queryData: ApolloQueryResult< GetGeneralSettingsQuery >
): GeneralSettingsProps {
	if ( queryData.errors?.length ) {
		queryData.errors?.forEach( ( error ) => {
			Logger.error( `Error fetching general settings: ${ error }` );
		} );
	}

	return queryData.data;
}
