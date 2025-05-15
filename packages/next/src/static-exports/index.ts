import { fetchQuery, GetPagesToRenderStaticallyDocument } from '@snapwp/query';
import type {
	GetPagesToRenderStaticallyQuery,
	InputMaybe,
	StaticRouteNodeDataFragment,
	StaticRoutePageInfoFragment,
} from '@snapwp/query';

export type VariableType = {
	first?: InputMaybe< number >;
} & {
	[ K in keyof GetPagesToRenderStaticallyQuery as `${ Extract<
		K,
		string
	> }Cursor` ]: InputMaybe< string >;
} & {
	[ K in keyof GetPagesToRenderStaticallyQuery as `${ Extract<
		K,
		string
	> }HasMore` ]: InputMaybe< boolean >;
};

/**
 * Fetches paths to be rendered statically.
 *
 * @param {VariableType} variables - The variables for the query.
 * @return The path data to be rendered statically.
 */
export const getWPStaticPaths = async (
	variables: VariableType = {}
): Promise< Array< { uri: string[] } > > => {
	const { first } = variables;
	const data = await fetchQuery( {
		name: 'GetPagesToRenderStatically',
		query: GetPagesToRenderStaticallyDocument,
		options: {
			variables: {
				first: first || 100,
				...variables,
			},
		},
	} );

	if ( ! data ) {
		throw new Error(
			'Error fetching pages to render statically. No data returned.'
		);
	}

	const resolvedData: Array< { uri: string[] } > = [];
	let shouldFetchMore = false;
	const newVariables: VariableType = {};

	Object.entries( data ).forEach( ( [ key, section ] ) => {
		if ( ! section ) {
			return;
		}

		// Here we know for sure that the key which is string is a key of GetPagesToRenderStaticallyQuery so it's safe to cast it.
		const resolvedKey = key as keyof GetPagesToRenderStaticallyQuery;

		const { nodes, pageInfo } = section as {
			nodes: StaticRouteNodeDataFragment[];
			pageInfo: StaticRoutePageInfoFragment;
		};

		// Store the data.
		resolvedData.push(
			...nodes
				.filter( ( { uri } ) => !! uri )
				.map( ( { uri } ) => {
					return {
						uri: uri!.split( '/' ).filter( Boolean ),
					};
				} )
		);

		// Set the pagination variables for the next fetch.
		const cursorKey = `${ resolvedKey }Cursor` satisfies keyof VariableType;
		const hasMoreKey =
			`${ resolvedKey }HasMore` satisfies keyof VariableType;

		if ( pageInfo.hasNextPage && pageInfo.endCursor ) {
			shouldFetchMore = true;
			newVariables[ cursorKey ] = pageInfo.endCursor;
		}
		newVariables[ hasMoreKey ] = !! newVariables?.[ cursorKey ];
	} );

	// Recursively fetch more data if there are more pages to fetch.
	if ( shouldFetchMore ) {
		const additionalData = await getWPStaticPaths( {
			first: first || 100,
			...newVariables,
		} );

		resolvedData.push( ...additionalData );
	}

	return resolvedData;
};
