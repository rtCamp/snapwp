import { QueryEngine, type Paths } from '@snapwp/query';

/**
 * Get the paths to render statically.
 *
 * @return The paths to render statically.
 */
export const getPathsToRenderStatically = async (): Promise<
	Array< { slug: string[] } >
> => {
	const pathsToRender: Paths =
		await QueryEngine.getPathsToStaticallyGenerate();

	const paths: Array< { slug: string[] } > = [];
	Object.keys( pathsToRender ).forEach( ( key ) => {
		if ( pathsToRender[ key ] ) {
			pathsToRender[ key ]?.forEach( ( path ) => {
				if ( path.uri ) {
					const slug = path.uri.split( '/' ).filter( Boolean );
					paths.push( { slug } );
				}
			} );
		}
	} );

	return paths;
};
