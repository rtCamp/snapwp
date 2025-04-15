import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { notFound } from 'next/navigation';

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( { editorBlocks, is404 } ) => {
				if ( is404 ) {
					notFound();
				}
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
