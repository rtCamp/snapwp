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

	pathsToRender.forEach( ( pathToRender ) => {
		const slugs = pathToRender.split( '/' ).filter( Boolean );
		paths.push( { uri: slugs } );
	} );

	return paths;
};
