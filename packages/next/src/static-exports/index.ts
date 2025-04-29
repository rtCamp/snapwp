import { QueryEngine } from '@snapwp/query';

/**
 * Get the paths to render statically.
 *
 * @return The paths to render statically.
 */
export const getPathsToRenderStatically = async (): Promise<
	Array< { path: string[] } >
> => {
	const pathsToRender = await QueryEngine.getPaths();

	const paths: Array< { path: string[] } > = [];

	if ( pathsToRender.pages ) {
		for ( const page of pathsToRender.pages ) {
			if ( page.uri ) {
				const path = page.uri.split( '/' ).filter( Boolean );
				paths.push( { path } );
			}
		}
	}

	if ( pathsToRender.posts ) {
		for ( const post of pathsToRender.posts ) {
			if ( post.uri ) {
				const path = post.uri.split( '/' ).filter( Boolean );
				paths.push( { path } );
			}
		}
	}

	if ( pathsToRender.terms ) {
		for ( const term of pathsToRender.terms ) {
			if ( term.uri ) {
				const path = term.uri.split( '/' ).filter( Boolean );
				paths.push( { path } );
			}
		}
	}

	return paths;
};
