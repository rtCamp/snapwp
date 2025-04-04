import { GlobalStylesParseError, type GlobalHeadProps } from '@snapwp/core';

import type { GetGlobalStylesQuery } from '@graphqlTypes/graphql';

/**
 * Parses template query data into props for rendering a template.
 *
 * @param {GetGlobalStylesQuery} queryData The data fetched from the template query.
 *
 * @throws Throws an error if the query data is missing or invalid.
 *
 * @return An object containing parsed template data.
 */
export default function parseQueryResult(
	queryData: GetGlobalStylesQuery
): GlobalHeadProps {
	// Check if globalStyles is null.
	if ( queryData.globalStyles === null ) {
		throw new GlobalStylesParseError( `Error fetching global styles.` );
	}

	if ( ! queryData ) {
		throw new GlobalStylesParseError( `Error fetching global styles.` );
	}

	const globalStyles = queryData.globalStyles;

	return {
		customCss: globalStyles?.customCss || null,
		globalStylesheet: globalStyles?.stylesheet || null,
		renderedFontFaces: globalStyles?.renderedFontFaces || null,
	};
}
