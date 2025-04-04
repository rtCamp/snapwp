interface Options {
	idKey?: string;
	parentKey?: string;
	childrenKey?: string;
}

type Data = Record< string | number, unknown >;

/**
 * Converts a flat list to hierarchical.
 *
 * @param {Array<Data>}            data                The data items as an array.
 * @param {Options}                options             The data item property keys.
 * @param {Options['idKey']}       options.idKey       The key for the unique identifier.
 * @param {Options['parentKey']}   options.parentKey   The key for the parent identifier.
 * @param {Options['childrenKey']} options.childrenKey The key for the children.
 *
 * @return Data Array
 */
export function flatListToHierarchical(
	data: Data[] = [],
	{
		idKey = 'id',
		parentKey = 'parentId',
		childrenKey = 'children',
	}: Options = {}
): Data[] {
	// Bail out if there is no data.
	if ( ! data.length ) {
		return [];
	}

	const tree: Data[] = [];
	const childrenOf = new Map< string | number, Data[] >();

	data.forEach( ( item ) => {
		const newItem = { ...item };
		const id = newItem[ idKey ] as string | number | undefined;
		const parentId = ( newItem[ parentKey ] ?? 0 ) as string | number;

		if ( ! id ) {
			return;
		}

		if ( ! childrenOf.has( id ) ) {
			childrenOf.set( id, [] );
		}
		newItem[ childrenKey ] = childrenOf.get( id );

		if ( parentId ) {
			if ( ! childrenOf.has( parentId ) ) {
				childrenOf.set( parentId, [] );
			}
			childrenOf.get( parentId )!.push( newItem );
		} else {
			tree.push( newItem );
		}
	} );

	return tree;
}
