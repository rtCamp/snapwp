import { QueryEngine } from '@snapwp/query';

/**
 * Get the paths to render statically.
 *
 * @return The paths to render statically.
 */
export const getPathsToRenderStatically = async (): Promise<
	Array< { uri: string[] } >
> => {
	const pathsToRender = await QueryEngine.getStaticPaths();

	const paths: Array< { uri: string[] } > = [];
	Object.keys( pathsToRender ).forEach( ( key ) => {
		if ( ! pathsToRender[ key ] ) {
			return;
		}

		pathsToRender[ key ]?.forEach( ( path ) => {
			if ( path.uri ) {
				const slugs = path.uri.split( '/' ).filter( Boolean );
				paths.push( { uri: slugs } );
			}
		} );
	} );

	return paths;
};
