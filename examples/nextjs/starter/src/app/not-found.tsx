import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';

export default function NotFound() {
	return (
		<TemplateRenderer>
			{ ( { editorBlocks } ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
