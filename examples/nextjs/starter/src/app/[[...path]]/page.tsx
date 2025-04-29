import { TemplateRenderer, getPathsToRenderStatically } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';

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
	return getPathsToRenderStatically();
};
