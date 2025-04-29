import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { QueryEngine } from '@snapwp/query';

export default async function Page( {
	params,
}: {
	params: Promise< {
		path: string[];
	} >;
} ) {
	return (
		<TemplateRenderer params={ params }>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}

export const generateStaticParams = async () => {
	const pages = await QueryEngine.getPagesToRenderStatically();

	const paths: Array< { path: string[] } > = [];

	if ( pages ) {
		for ( const page of pages ) {
			if ( page.uri ) {
				const path = page.uri.split( '/' ).filter( Boolean );
				paths.push( { path } );
			}
		}
	}

	return paths;
};
