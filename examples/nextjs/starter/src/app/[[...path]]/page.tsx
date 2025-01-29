import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';

/**
 * @todo Add an example of progressively overloading block definitions, e.g.:
 *
 * const blocks: BlockDefinitions = {
 *  'CoreCustom': lazy( () => import( './core-custom' ) ),
 *  'CoreParagraph': null, // To use html-react-parser.
 * };
 *
 * This may alternatively be better done in the config.
 */

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
