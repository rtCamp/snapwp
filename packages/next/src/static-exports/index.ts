import { QueryEngine } from '@snapwp/query';

/**
 * Get the paths to render statically.
 *
 * @return The paths to render statically.
 */
export const getPathsToRenderStatically = async (): Promise<
	Array< { slug: string[] } >
> => {
	const pathsToRender = await QueryEngine.getPaths();

	const paths: Array< { slug: string[] } > = [];

	if ( pathsToRender.pages ) {
		for ( const page of pathsToRender.pages ) {
			if ( page.uri ) {
				const slug = page.uri.split( '/' ).filter( Boolean );
				paths.push( { slug } );
			}
		}
	}

	if ( pathsToRender.posts ) {
		for ( const post of pathsToRender.posts ) {
			if ( post.uri ) {
				const slug = post.uri.split( '/' ).filter( Boolean );
				paths.push( { slug } );
			}
		}
	}

	if ( pathsToRender.terms ) {
		for ( const term of pathsToRender.terms ) {
			if ( term.uri ) {
				const slug = term.uri.split( '/' ).filter( Boolean );
				paths.push( { slug } );
			}
		}
	}

	return paths;
};
