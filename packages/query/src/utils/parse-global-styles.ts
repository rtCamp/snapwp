import { ApolloQueryResult } from '@apollo/client';
import { GetGlobalStylesQuery } from '@graphqlTypes/graphql';
import {
	type GlobalHeadProps,
	GlobalStylesParseError,
	Logger,
} from '@snapwp/core';

/**
 * Parses template query data into props for rendering a template.
 *
 * @param queryData - The data fetched from the template query.
 *
 * @throws Throws an error if the query data is missing or invalid.
 *
 * @return An object containing parsed template data.
 */
export default function parseQueryResult(
	queryData: ApolloQueryResult< GetGlobalStylesQuery >
): GlobalHeadProps {
	if ( queryData.errors?.length ) {
		queryData.errors?.forEach( ( error ) => {
			Logger.error(
				`Error fetching global styles: ${ error?.message }`,
				error
			);
		} );
	}

	// Check if globalStyles is null.
	if ( queryData.data.globalStyles === null ) {
		throw new GlobalStylesParseError( `Error fetching global styles.` );
	}

	if ( ! queryData.data && queryData.errors?.length ) {
		throw new GlobalStylesParseError( `Error fetching global styles.` );
	}

	const globalStyles = queryData.data?.globalStyles;

	return {
		customCss: globalStyles?.customCss,
		globalStylesheet: globalStyles?.stylesheet,
		renderedFontFaces: globalStyles?.renderedFontFaces,
	};
}
